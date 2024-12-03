/* eslint-env jest */

const path = require('node:path')
const run = require('./run')
const expectedKeys = require('./data/key.js')

test('Pass key as file', async () => {
  const { stdout } = await run({ args: [
    '--file', path.join(__dirname, 'data', 'tls.key')
  ] })

  expect(stdout).toMatchObject(expectedKeys)
})
