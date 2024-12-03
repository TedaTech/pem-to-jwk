'use strict'

const jose = require('node-jose')
const fs = require('node:fs')
const { Command } = require('commander')

const program = new Command()

/**
 * Collect extra key=value pairs
 *
 * @param value
 * @param previous
 * @returns {*}
 */
function collectExtras (value, previous) {
  return previous.concat([value])
}

/**
 * Read file content
 *
 * @param file
 */
async function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

/**
 * Read file stdin
 */
async function readStdin () {
  return new Promise((resolve, reject) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => {
      data += chunk
    })
    process.stdin.on('end', () => {
      resolve(data)
    })
    process.stdin.on('error', reject)
  })
}

program
  .name('pem-to-jwk')
  .description('Convert a PEM-encoded key to a JWK')
  .option('-p, --public', 'Output public key only', false)
  .option('-j, --jwks-out', 'Wrap output in a JWKS structure', false)
  .option('-t, --pretty', 'Pretty-print the output JSON', false)
  .option('-k, --kid <kid>', 'Set the Key ID (kid) parameter')
  .option('-e, --extra <key=value...>', 'Additional key=value pairs to include', collectExtras, [])
  .option('-f, --file <path>', 'Input file to read the key from')
  .option('-o, --out <path>', 'Output file path (default: stdout)')
  .helpOption('-h, --help', 'Show help')
  .action(async (options, command) => {
    const output = command.configureOutput()
    const data = options.file ? await readFile(options.file) : await readStdin()

    const keyProps = {}
    if (options.kid) {
      keyProps.kid = options.kid
    }

    if (options.extra && options.extra.length > 0) {
      options.extra.forEach(pair => {
        const [key, value] = pair.split('=')
        if (key && value) {
          keyProps[key] = value
        } else {
          program.error(`Invalid format for --extra option: ${pair}. Expected key=value.`)
        }
      })
    }

    const result = await jose.JWK.asKey(data, 'pem', keyProps)
    let res = result.toJSON(!options.public)
    if (options.jwksOut) {
      res = {
        keys: [res]
      }
    }
    const json = options.pretty ? JSON.stringify(res, null, 2) : JSON.stringify(res)
    if (options.out) {
      await fs.promises.writeFile(options.out, json, 'utf8')
    } else {
      output.writeOut(json)
    }
  })

module.exports = program
