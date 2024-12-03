/* eslint-env jest */

const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const run = require('./run')

test('Write output to file using --out parameter', async () => {
  // Create a temporary directory for the test output
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'))
  const outputFile = path.join(tempDir, 'output.json')

  // Run the program with the --out parameter
  await run({
    stdin: fs.readFileSync(path.join(__dirname, 'data', 'tls.key')),
    args: ['--out', outputFile],
    asJson: false
  })

  // Read and parse the output file
  const outputContent = fs.readFileSync(outputFile, 'utf8')
  const outputJson = JSON.parse(outputContent)

  // Perform assertions on the output JSON
  expect(outputJson).toBeDefined()
  expect(outputJson).toHaveProperty('kty')

  // Clean up the temporary directory and file
  fs.unlinkSync(outputFile)
  fs.rmdirSync(tempDir)
})
