const { program } = require('commander');
const util = require('util');
const fs = require("fs");

const log = console.log;

const apiInput = pathStr => {
    if (fs.existsSync(pathStr)) return log('file is reading');
    if (!pathStr) {
        process.stdout.write("Type your input: ");
        return process.stdin;
    }
    process.stderr.write("Input file does not found");
    process.exit(1);
}

try {
    program
        .option('-s, --shift <value>', 'shift')
        .option('-i, --input <value>', 'input file')
        .option('-o, --output <value>', 'output file')
        .option('-a, --action <value>', 'action encode/decode')
        .parse(process.argv);
    log(program.opts())
    if (!program.opts().shift || !program.opts().action) throw new Error('missing shift or action params')
    apiInput(program.opts().input)
} catch (err) {
    log(`Exception : \n${err.message}`)
    process.exit(1)
}