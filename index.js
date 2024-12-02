const jose = require('node-jose')
const fs = require('fs')
const yargs = require('yargs')
process.stdin.setEncoding('utf8')

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('public', {
    alias: 'p',
    type: 'boolean',
    description: 'Output public key only'
  })
  .option('jwks-out', {
    alias: 'j',
    type: 'boolean',
    description: 'Wrap output in a JWKS structure'
  })
  .option('pretty', {
    alias: 't',
    type: 'boolean',
    description: 'Pretty-print the output JSON'
  })
  .option('kid', {
    alias: 'k',
    type: 'string',
    description: 'Set the Key ID (kid) parameter'
  })
  .option('extra', {
    alias: 'e',
    type: 'string',
    description: 'Additional key=value pairs to include',
    multiple: true
  })
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'Input file to read the key from'
  })
  .help('h')
  .alias('h', 'help')
  .argv

const publicOnly = argv.public || false
const wrapInJwks = argv['jwks-out'] || false
const pretty = argv.pretty || false
const kid = argv.kid
const file = argv.file

let data = ''

const extras = {}
if (kid) {
  extras.kid = kid
}

if (argv.extra) {
  const extraProps = Array.isArray(argv.extra) ? argv.extra : [argv.extra]
  extraProps.forEach(pair => {
    const [key, value] = pair.split('=')
    if (key && value) {
      extras[key] = value
    } else {
      console.error(`Invalid format for --extra option: ${pair}. Expected key=value.`)
      process.exit(1)
    }
  })
}

function convert() {
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
  } catch (err) {
    console.error(err)
    return
  }
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
