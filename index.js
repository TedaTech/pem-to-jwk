const jose = require('node-jose')
const fs = require('fs')
const { Command } = require('commander')
process.stdin.setEncoding('utf8')

function collectExtras(value, previous) {
  return previous.concat([value])
}

const program = new Command()

program
  .usage('[options]')
  .option('-p, --public', 'Output public key only')
  .option('-j, --jwks-out', 'Wrap output in a JWKS structure')
  .option('-t, --pretty', 'Pretty-print the output JSON')
  .option('-k, --kid <kid>', 'Set the Key ID (kid) parameter')
  .option('-e, --extra <key=value...>', 'Additional key=value pairs to include', collectExtras, [])
  .option('-f, --file <path>', 'Input file to read the key from')
  .helpOption('-h, --help', 'Show help')
  .version('1.0.0')
  .parse(process.argv)

const options = program.opts()
const publicOnly = options.public || false
const wrapInJwks = options.jwksOut || false
const pretty = options.pretty || false
const kid = options.kid
const file = options.file

let data = ''

const extras = {}
if (kid) {
  extras.kid = kid
}

if (options.extra && options.extra.length > 0) {
  options.extra.forEach(pair => {
    const [key, value] = pair.split('=')
    if (key && value) {
      extras[key] = value
    } else {
      console.error(`Invalid format for --extra option: ${pair}. Expected key=value.`)
      process.exit(1)
    }
  })
}

function convert () {
  jose.JWK.asKey(data, 'pem', extras)
    .then(function (result) {
      let res = result.toJSON(!publicOnly)
      if (wrapInJwks) {
        res = {
          keys: [ res ]
        }
      }
      let output = pretty ? JSON.stringify(res, null, 2) : JSON.stringify(res)
      console.log(output)
    })
}


if (file) {
  try {
    data = fs.readFileSync(file, 'utf8')
    convert()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
} else {
  process.stdin.on('data', (chunk) => {
    data += chunk
  })
  process.stdin.on('end', () => {
    convert()
  })
}
