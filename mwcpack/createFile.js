const fs = require('fs')
const path = require('path')
module.exports = (config, bundleCode) => {
  const output = config.output
  mkdirSync(output.path)
  fs.writeFileSync(path.resolve(output.path, output.js.name), bundleCode)
  createHtml(config.entry.htmlName, output)
}
function mkdirSync (urlPath) {
  try {
    fs.statSync(urlPath)
  } catch (err) {
    fs.mkdirSync(urlPath)
  }
}
function createHtml (entryHtmlName, output) {
  const html = fs.readFileSync(entryHtmlName, 'utf8')
    .replace(/(<\/body>)/, `<script src="./${output.js.name}"></script>
  $1`)
  fs.writeFileSync(path.resolve(output.path, output.html.name), html)
}
