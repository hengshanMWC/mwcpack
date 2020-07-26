const fs = require('fs')
const path = require('path')
module.exports = (output, bundleCode) => {
  mkdirSync(output.path)
  fs.writeFile(path.resolve(output.path, 'index.js'), bundleCode, (err) => {
    if (err) return console.error(err)
  })
}
function mkdirSync (urlPath) {
  try {
    fs.statSync(urlPath)
  } catch (err) {
    fs.mkdirSync(urlPath)
  }
}
