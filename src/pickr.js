// Pickr module code

export function init({ yargs, fs }) {
	const filepath = parseFilepath({ yargs });
	const file = readFile(filepath, { fs });
	const list = validLines(splitFile({ file, separator: '\n' }));
	return list[randomIndex(list)];
}

export function parseFilepath({ yargs }) {
	const filepath = yargs.argv._[0];
	if (!filepath) {
		throw new Error('No file path provided.');
	}
	return filepath;
}

export function readFile(filepath, { fs }) {
	return fs.readFileSync(filepath, 'utf8');
}

export function splitFile({ file, separator }) {
	if (typeof file !== 'string') throw new Error('invalid file was passed to splitFile');
	return file.split(separator);
}

export function randomIndex(lines) {
	if (!lines || !lines.length) throw new Error('invalid array was passed to randomIndex');
	return Math.floor(Math.random() * (lines.length - 0));
}

export function ignoreBlankLines(line) {
	return !(/^\s*$/.test(line));
}

export function ignoreComments(line) {
	return line.charAt(0) !== '#';
}

export function validLines(list) {
	return list
			.filter(ignoreComments)
			.filter(ignoreBlankLines);
}
