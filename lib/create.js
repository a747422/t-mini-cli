// lib/create.js

const path = require('path')
// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fse = require('fs-extra')
// inquirer 命令行交互工具
const inquirer = require('inquirer')
// 创建功能l
const Generator = require('./generator')

module.exports = async function (name, options) {
  // 当前命令行选择的目录
  const cwd = process.cwd()
  let extraPath = ''
  //  -c -p 都要加上指定目录
  if (options.component) extraPath = 'src/components'
  if (options.page) extraPath = 'src/pages'

  // 需要创建的目录地址
  const targetAir = path.join(cwd, extraPath, name)
  // 目录是否已经存在
  if (fse.pathExistsSync(targetAir)) {

    // 是否为强制创建
    if (options.force) {
      await fse.remove(targetAir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'Target directory already exists Pick an action:',
        choices: [
          {
            name: 'Overwrite',
            value: 'overwrite'
          }, {
            name: 'Cancel',
            value: false
          }
        ]
      }])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fse.remove(targetAir)
      }

    }

  }
  // 创建项目
  const generator = new Generator(name, targetAir)

  // 开始创建项目
  generator.create()
}
