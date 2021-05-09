const { program } = require('commander');
const util = require('util');
const { pipeline } = require("stream");
const { getTransformerStream, getOutputStream, getInputStream } = require("./tools/streamTransformAPI");

const log = console.log;
const pipelineAsync = util.promisify(pipeline);


try {
    program
        .option('-s, --shift <value>', 'shift')
        .option('-i, --input <value>', 'input file')
        .option('-o, --output <value>', 'output file')
        .option('-a, --action <value>', 'action encode/decode')
        .parse(process.argv);
    log(program.opts())
    if (!program.opts().shift || !program.opts().action) throw new Error('missing shift or action params');
} catch (err) {
    log(`Exception : \n${err.message}`)
    process.exit(1)
}
const { shift, input, output, action } = program.opts();

const inputStream = getInputStream(input);
const transformerStream = getTransformerStream(action, shift);
const outputStream = getOutputStream(output);


(async () => {
    try {
        await pipelineAsync(inputStream, transformerStream, outputStream);
    } catch (err) {
        log(`app run /n${err}`);
    }
})();

