var path=require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂碍一个plugins对象
var htmlWebpackPlugin=require('html-webpack-plugin')


// 当以命令行运行webpack或者webpack-dev-server的时候
// 工具会发现我们并没有提供要打包的文件的入口和出口文件
// 并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建
module.exports={
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output:{  //指定输出选项
        path:path.join(__dirname,'./dist'), //输出路径
        filename:'bundle.js'  //指定输出名称
    },
    mode: 'development',
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),  //指定模板文件路径
            filename:'index.html'  //设置生成的内存页面名称
        })
    ],
    module:{//配置所有第三方loader模块的
    rules:[
        {test:/\.css$/,use:['style-loader','css-loader']},
        {test:/\.ttf$/,use:['file-loader']},
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
        // 处理图片路径的loader
        // limit给定的值，是图片大小，单位是byte，如果我们引用图片的大小大于或等于给定的limit值，则不会转为base64格式的字符串
        // 如果图片小于给定的limit值，则会转为base64字符串
        {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=40&name=[hash:8]-[name].[ext]'},
        {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//这是配置Babel来解决高级语法
        {test:/\.vue$/,use:'vue-loader'},
    ]
    }


}