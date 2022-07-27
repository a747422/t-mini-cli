// lib/generator.js

const path = require('path')
const fs = require('fs')
// ejs 模板解析:https://www.npmjs.com/package/ejs
const ejs = require('ejs')

class Generator {
    constructor (name, targetDir){
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
    }

    // 核心创建逻辑
    create(){
        // 模版文件目录
        // path.resolve('./')和process.cwd() ：输入命令所在路径
        // __dirname : 运行文件所在目录
        const destUrl =  path.resolve(__dirname, '../templates');
        // 生成文件目录
        // process.cwd() 对应控制台所在目录
        const cwdUrl = process.cwd();
        // 创建目录 node>10.14.0可以使用自带的递归创建目录,直接用mkdir 出现了目录创建不全的情况
        if (!fs.existsSync(this.targetDir))  { fs.mkdirSync(this.targetDir,{recursive: true })}

        // 从模版目录中读取文件
        fs.readdir(destUrl, (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                // 使用 ejs 渲染对应的模版文件
                // renderFile（模版文件地址，传入渲染数据）
                const fileName = this.name.split('/');
                ejs.renderFile(path.join(destUrl, file), {name:fileName[fileName.length-1]}).then(data => {
                    // 生成 ejs 处理后的模版文件
                    fs.writeFileSync(path.join(this.targetDir, file) , data)

                })
            })
            console.log('generator success,path:',this.targetDir)
        })
    }
}

module.exports = Generator;
