module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        // 资源目录放置 当前目录(根目录)  也就是说资源需要从根目录开始查找 
        path: './static/',
        // 打包文件的路径 （当使用webpack服务是    文件是 static下面的子目录 ）
        filename: '[name].js',
        // 把资源发到 线上地址 
        publicPath: 'http://localhost:8080/static/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets:['react', 'es2015']
            }
        },{
            test: /\.less$/,
            loader: 'style!css!less'
        },{ 
            test: /\.(png|jpg)$/, 
            loader: 'url-loader?limit=8192'
        }]
    }        
}

// npm  install preset-react / preset-es2015   react-dom 