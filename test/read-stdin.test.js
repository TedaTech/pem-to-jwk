/* eslint-env jest */

const fs = require('node:fs')
const path = require('node:path')
const run = require('./run')
const expectedKeys = require('./data/key.js')

test('Read stdin and produce jwk', async () => {
  const { stdout } = await run({
    stdin: fs.readFileSync(path.join(__dirname, 'data', 'tls.key'))
  })

  expect(stdout).toMatchObject(expectedKeys)
})
