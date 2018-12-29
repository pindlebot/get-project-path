const gpp = require('../')
const path = require('path')

it('should get the project path', async () => {
  let projectPath = await gpp()
  expect(projectPath).toMatch(path.join(__dirname, '..'))
})