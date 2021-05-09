const { program } = require('commander');
const util = require('util');
const { pipeline } = require("stream");
const fs = require("fs");

const log = console.log;
const pipelineAsync = util.promisify(pipeline);

const apiInput = pathInputFile => {
    if (fs.existsSync(pathInputFile)) return log('file is reading');
    if (!pathInputFile) {
        process.stdout.write("Type your input: ");
        return process.stdin;
    }
    process.stderr.write("Input file does not found");
    process.exit(1);
}


const apiOutput = pathOutputFile => {
    if (fs.existsSync(pathOutputFile)) return log('file is writing');
    if (!pathOutputFile) return process.stdout;
    process.stderr.write("Output file does not found");
    process.exit(1);
};

const getTransformerStream = (action, shift) => {
    class Transformer extends Transform {

        constructor() {
            super();
        }

        _transform(chunk, enc, done) {
            try {
                if (action === "encode") this.push(encode(chunk.toString(), shift));
                if (action === "decode") this.push(decode(chunk.toString(), shift));
                if (action !== "encode" && action !== "decode") {
                    console.error(`exeption  getTransformerStream(), creatStreem.js[str34], action = ${action}`);
                    process.exit(1);
                    done();
                }
            } catch (err) {
                done(err);
                console.log(err);
            }

        }
    }
    return new Transformer();
};


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


const inputStream = apiInput(program.input);
const transformerStream = getTransformerStream(program.action, program.shift);
const outputStream = apiOutput(program.output);


(async () => {
    try {
        await pipelineAsync(readStream, transformerStream, writeStream);
    } catch (err) {
        log(`app run /n${err}`);
    }
})();