///////////
// Pickr //
/////////////////////////////////////////
// Pick a random line from a text file //
/////////////////////////////////////////

// Dependencies
import yargs from 'yargs';
import fs from 'fs';

// Source code
import * as pickr from './pickr';

const chosen = pickr.init({ yargs, fs });
console.log(chosen);
