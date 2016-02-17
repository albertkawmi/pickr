import expect from 'expect';
import * as pickr from '../src/pickr';
import fs from 'fs';

describe('pickr >', () => {
	describe('load a text file >', () => {
		it('should read the file path from supplied args', () => {
			const yargs = { argv: { filepath: 'path/to/file.txt' }};
			expect(pickr.parseFilepath({ yargs })).toEqual('path/to/file.txt');
		});

		it('should throw an error if no file path is provided', () => {
			const yargs = { argv: {}};
			expect(pickr.parseFilepath).withArgs({ yargs }).toThrow();
			yargs.argv.f = '';
			expect(pickr.parseFilepath).withArgs({ yargs }).toThrow();
		});
				
		it('should throw an error if the file could not be found', () => {
			const filepath = 'does/not/exist.txt';
			expect(pickr.readFile).withArgs(filepath, { fs }).toThrow();
		});
	});

	describe('pick a random line from text file >', () => {	
		const list = pickr.splitFile({
			file: '   \nGreg\n\nJoe\nJon\n ',
			separator: '\n'
		});

		it('should split the file into an array of lines', () => {
			expect(Array.isArray(list)).toBe(true);
			expect(list.length).toEqual(6);
		});
		
		it('should ignore lines that only contain whitespace', () => {
			expect(pickr.ignoreBlankLines('   ')).toBe(false);
			expect(pickr.ignoreBlankLines('abc')).toBe(true);
		});
		
		it('should ignore lines beginning with comments', () => {
			expect(pickr.ignoreComments('# a commented line')).toBe(false);
			expect(pickr.ignoreComments('not a comment')).toBe(true);
		});

		it('should return a new array without comments or empty lines', () => {
			expect(pickr.validLines(list).length).toEqual(3);
		});
		
		it('should throw an error if there are no lines to choose from', () => {
			expect(pickr.randomIndex).withArgs([]).toThrow();
		});
		
		it('should return a random array index', () => {
			const validList = ['Greg', 'Joe', 'Jon'];
			let count = 1000;
			let results = [];
			while(count--) {
				const random = pickr.randomIndex(validList);
				expect(random).toBeLessThanOrEqualTo(2);
				expect(random).toBeGreaterThanOrEqualTo(0);
				results.push(random);
			}
			expect(results.indexOf(0)).toBeGreaterThan(-1);
			expect(results.indexOf(1)).toBeGreaterThan(-1);
			expect(results.indexOf(2)).toBeGreaterThan(-1);
			expect(results.indexOf(3)).toEqual(-1);
		});		
	});
});