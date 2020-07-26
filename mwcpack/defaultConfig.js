const _ = require('lodash')
const _defaultConfig = {
  entry: {
    jsName: './index.js',
    htmlName: './index.html'
  },
  output: {
    path: './dist',
    js: {
      name: 'index.js',
      location: '<\/body>'
    },
    html: {
      name: 'index.html'
    }
  }
}
module.exports = function (config) {
  const defaultConfig = JSON.parse(JSON.stringify(_defaultConfig))
  const _config = JSON.parse(JSON.stringify(config))
  const result = Object.assign({}, defaultConfig, _config)
  if (_config.output) {
    result.output.path = _config.output.path
    if (_config.output.js && _.isString(_config.output.js)) {
      result.output.js = {
        name: _config.output.js,
        location: '<\/body>'
      }
    }
    if (_config.output.html && _.isString(_config.output.html)) {
      result.output.html = {
        name: _config.output.html
      }
    }
  }
  return result
}