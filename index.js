const jose = require('node-jose')
const fs = require('fs')
const { Command } = require('commander')
process.stdin.setEncoding('utf8')

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
  .helpOption('-h, --help', 'Show help')
  .action(async (options) => {
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
          console.error(`Invalid format for --extra option: ${pair}. Expected key=value.`)
          process.exit(1)
        }
      })
    }

    jose.JWK.asKey(data, 'pem', keyProps)
      .then(function (result) {
        let res = result.toJSON(!options.public)
        if (options.jwksOut) {
          res = {
            keys: [ res ]
          }
        }
        let output = options.pretty ? JSON.stringify(res, null, 2) : JSON.stringify(res)
        console.log(output)
      })
  })

program.parse()
