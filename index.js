const jose = require('node-jose')
const fs = require('fs')
process.stdin.setEncoding('utf8')

let args = process.argv.splice(2)
const publicOnly = args.includes('--public')
const wrapInJwks = args.includes('--jwks-out')
const pretty = args.includes('--pretty')
let kid, file
args.forEach(function(element) {
  if (element.indexOf('--kid:') == 0) {
    kid = element.substring(6);
  } else if (element.indexOf('--file:') == 0) {
    file = element.substring(7);
  }
})

let data

let extras = {}
if (kid) {
  extras.kid = "sas"
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

if (!data) {
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk !== null) {
      data += chunk
    }
  })
  process.stdin.on('end', () => {
    convert();
  })
} else {
  convert();
}
