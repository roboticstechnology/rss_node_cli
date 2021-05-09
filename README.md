# rss_node_cli


Caesar cipher CLI tool.
It can encode and decode text data using Caesar's cipher.
The app transform only latin letters, other characters remain unchanged.

## How to install

1. Download or clone this repository
2. Use the command `npm i` or `npm install` to install the dependencies

## How to use

In the app folder write the command `node caesar-cipher [options]`, where the `options` are:
* `-s, --shift`: cipher shift (required, integer)
* `-a, --action`: action - encode/decode (required)
* `-i, --input`: input file (default: `stdin`)
* `-o, --output`: output file (default: `stdout`)

### Usage examples:

```bash
$ node index --action encode --shift 7 --input input.txt --output output.txt

$ node index -a encode -s 7 
```
