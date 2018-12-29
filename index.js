const util = require('util')
const path = require('path')
const glob = util.promisify(require('glob'))

const IGNORE = [
  '**/node_modules/**'
]

const getPathMaybe = options => glob('**/package.json', options)
  .then(paths =>
    paths.length ? path.join(cwd, paths[paths.length - 1]) : undefined
  )

async function getProjectPath (opts = {}) {
  let options = {
    cwd: process.cwd(),
    ignore: IGNORE,
    ...opts
  }
  let projectPath
  while (!projectPath) {
    projectPath = await getPathMaybe(options)
    options.cwd = path.join(options.cwd, '../')
  }
  return path.parse(projectPath).dir
}

module.exports = getProjectPath
