const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require("preload-webpack-plugin"); // 预加载所有chunk
const webpack = require('webpack');
const moment = require('moment');
const ip = require('ip');
const path = require('path');

const BUID_TIMESTAMP = moment().format("YYYY-MM-DD HH:mm:ss");
const LOCAL_HOST = ip.address(); // 修改为本机IP
const PORT = 3032; // WEBPACKSERVER PORT
const DEFINE_ANT_THEME = require('./theme.config.js'); // 修改antd.design主题文件

module.exports = {
    context  : __dirname,
    entry    : {
        index: './src/index.js',
    },
    output   : {
        // path: path.resolve(__dirname, "build/dist"), // 将文件打包到此目录下
        // publicPath: "/dist/", // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
        // filename: "[name].[hash:6].js",
        // chunkFilename: "[name].[hash:6].chunk.js"
        path      : "/", // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
        publicPath: "/", // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
        filename  : "bundle.js" //编译后的文件名字
    },
    resolve  : {
        extensions: [
            ".js", ".jsx", '.html'
        ],
        alias     : {
            assets    : path.resolve(__dirname, 'src/assets'),
            components: path.resolve(__dirname, 'src/components'),
            actions   : path.resolve(__dirname, 'src/actions'),
            containers: path.resolve(__dirname, 'src/containers'),
            reducers  : path.join(__dirname, 'src/reducers'),
            store     : path.join(__dirname, 'src/store'),
            routes    : path.join(__dirname, 'src/routes'),
            utils     : path.resolve(__dirname, 'src/utils'),
        }
    },
    module   : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use : [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }, {
                        loader : "less-loader",
                        options: {
                            javascriptEnabled: true,//Inline JavaScript is not enabled. Is it set in your options?
                            modifyVars       : DEFINE_ANT_THEME,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use : [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader : "css-loader",
                        options: {
                            modules       : true,
                            importLoaders : 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap     : true,
                            minimize      : true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader : 'url-loader',
                        options: {
                            limit : 8192,
                            prefix: 'images',
                            name  : 'images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins  : [
        //new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            //根据模板插入css/js等生成最终HTML
            filename: "index.html", //生成的html存放路径，相对于 output.path
            favicon : "./public/favicon.ico", // 自动把根目录下的favicon.ico图片加入html
            template: "./public/index.html", //html模板路径
            inject  : true // 是否将js放在body的末尾
        }),

        new webpack.BannerPlugin(`Copyright Leesx inc. \n update: ${BUID_TIMESTAMP}`),
        new PreloadWebpackPlugin(),
    ],
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },

        // 跨域代理
        proxy             : [
            {
                context     : ['/saas/support/**'],
                changeOrigin: true,
                target      : 'http://xxxxx.com',
                secure      : false
            }
        ],
        historyApiFallback: true, //支持像react-router或vue-router的模式为browserHistory时，路由的跳转问题
        //devtool: 'eval',
        //hot               : true, //热替换
        //inline            : true, //自动刷新
        host              : 'localhost',
        port              : PORT,
        //https:{}, //开启https
        //compress: true, //开启gzip压缩
        disableHostCheck  : true
    },
};
