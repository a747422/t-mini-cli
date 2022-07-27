#! /usr/bin/env node
// #! ：指定由哪个解释器来执行脚本
// 自定义命令
const program = require('commander')
// 命令行美化
const chalk = require('chalk')
program
  // 定义命令和参数
  .command('create <name>')
  .description('create a new page')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .option('-c, --component', 'created in the components directory under src')
  .option('-p, --page', 'created in the pages directory under src')
  .action((name, options) => {
    // 打印执行结果
    // console.log('name:',name,'options:',options)
    require('../lib/create.js')(name, options)
  })

// 监听 --help 执行
program
  .on('--help', () => {
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(` <command> --help`)} for detailed usage of given command\r\n`)
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv)
