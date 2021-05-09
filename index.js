const { program } = require('commander');
const util = require('util');

const log = console.log;

try {
    program
        .option('-s, --shift <value>', 'shift')
        .option('-i, --input <value>', 'input file')
        .option('-o, --output <value>', 'output file')
        .option('-a, --action <value>', 'action encode/decode')
        .parse(process.argv);
    log(program.opts())
    if (!program.opts().shift || !program.opts().actions) throw new Error('missing shift or action params')
} catch (err) {
    log(`Exception : \n${err.message}`)
    process.exit(1)
}