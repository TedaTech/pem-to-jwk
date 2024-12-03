/* eslint-env jest */

const fs = require('node:fs')
const path = require('node:path')
const run = require('./run')

test('Read stdin and produce jwk', async () => {
  const { stdout } = await run({
    stdin: fs.readFileSync(path.join(__dirname, 'data', 'tls.key')),
    args: ['--extra', 'alg=RS256']
  })

  expect(stdout).toMatchObject({
    alg: 'RS256'
  })
})
