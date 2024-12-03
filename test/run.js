const { stdin: stdinMocker } = require('mock-stdin')
const program = require('../src/program.js')

module.exports = async function (props) {
  const { stdin, asJson, args } = props
  let stdout = ''
  let stderr = ''

  const stdinMock = stdinMocker()
  const parsePromise = program
    .exitOverride()
    .configureOutput({
      writeOut: (str) => { stdout += str },
      writeErr: (str) => { stderr += str }
    })
    .parseAsync(args || [], { from: 'user' })

  if (stdin) {
    await stdinMock.send(stdin, 'utf8')
    await stdinMock.send(null)
  }

  await parsePromise

  const parseStdout = asJson === undefined ? true : asJson
  return {
    stdout: parseStdout ? JSON.parse(stdout) : stdout,
    stderr
  }
}
