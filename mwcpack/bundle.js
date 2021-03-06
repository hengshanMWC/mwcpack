const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = (file)=>{
  const body = fs.readFileSync(file,'utf-8')
  const ast = parser.parse(body,{
      sourceType:'module' //表示我们要解析的是ES模块
  });
  const deps = {}
  traverse(ast,{
    ImportDeclaration({node}){
      const dirname = path.dirname(file)
      const abspath = "./" + path.join(dirname,node.source.value)
      deps[node.source.value] = abspath
    }
  })
  const {code} = babel.transformFromAst(ast,null,{
    presets:["@babel/preset-env"]
  })
  // 新增代码
  const result = {file,deps,code}
  return result
}
const parseModules = file => {
  const entry =  getModuleInfo(file)
  const temp = [entry] 
  const result = {} //新增代码
  for (let i = 0;i<temp.length;i++){
    const deps = temp[i].deps
    if (deps){
      for (const key in deps){
        if (deps.hasOwnProperty(key)){
          temp.push(getModuleInfo(deps[key]))
        }
      }
    }
  }
  // 新增代码
  temp.forEach(moduleInfo=>{
    result[moduleInfo.file] = {
      deps:moduleInfo.deps,
      code:moduleInfo.code
    }
  })
  return result
}
module.exports = function (file) {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
    function require (file) {
      function absRequire (relPath) {
        return require(graph[file].deps[relPath])
      }
      var exports = {};
      (function (require, exports, code) {
        eval(code)
      })(absRequire, exports, graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`
}