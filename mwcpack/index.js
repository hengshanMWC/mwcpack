const bundle = require('./bundle')
const createFile = require('./createFile')
const defaultConfig = require('./defaultConfig')
const config = require('../mwcpack.config.js')
const _config = defaultConfig(config)
console.log(_config)
const bundleCode = bundle(_config.entry.jsName)
createFile(_config, bundleCode)