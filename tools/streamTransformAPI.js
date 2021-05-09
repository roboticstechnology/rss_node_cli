const fs = require("fs");
const { Transform } = require("stream");
const { encode, decode } = require("./codec");

const log = console.log;

const getInputStream = pathInput => {
  if (fs.existsSync(pathInput)) return fs.createReadStream(pathInput);
  if (!pathInput) {
    process.stdout.write("Type your input: ");
    return process.stdin;
  }
  process.stderr.write("Input file does not found\n");
  process.exit(1);
};

const getOutputStream = pathOutput => {
  if (fs.existsSync(pathOutput)) return fs.createWriteStream(pathOutput);
  if (!pathOutput) return process.stdout;
  process.stderr.write("Output file does not found\n");
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
          log(`exeption , action = ${action}`);
          process.exit(1);
          done();
        }
      } catch (err) {
        done(err);
        log(err);
      }

    }
  }
  return new Transformer();
};

module.exports = {
  getTransformerStream,
  getInputStream,
  getOutputStream
}
