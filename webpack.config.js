const path        = require('path'),
      webpack     = require('webpack');
      HtmlWebpack = require('html-webpack-plugin'),
      WorkboxWebpack = require('workbox-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const source = path.resolve(__dirname, 'dev');
const destination = path.resolve(__dirname, 'build');
const appDirectory = path.resolve(source, 'app');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const BaseHrefWebpackPlugin  = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;

module.exports = {
    entry: {
        // polyfills : './dev/polyfills.ts',
        // vendor    : './dev/vendor.ts',
        common:['./dev/polyfills.ts', './dev/vendor.ts', "./dev/G.module.ts"],
        app       : './dev/main.ts',
        login     : './dev/login.ts'
    },
    output: {
        path:path.join(__dirname, "build"),
        filename:"js/[name].[hash:8].build.js",
        chunkFilename:"chunk/[name].chunk.[chunkhash:8].js",
        publicPath: ''
    },
    // devtool: 'inline-source-map',    
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            "node_modules"
        ]
    },
    module: {

        rules: [
            {
                test: /\.ts$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    },
                    'angular2-template-loader',
                    'angular-router-loader',
                    '@ngtools/webpack'
                ]
            },
            {
                test: /\.css$/,
                exclude: appDirectory,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.css$/,
                include: appDirectory,
                use:['raw-loader']
            },
            {
                test: /\.html$/,
                use:['raw-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath:"images/",
                        publicPath:"../"
                    }
                }
                ]
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath:"fonts/",
                        publicPath:"../"
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './dev'),{}),
        new ExtractTextPlugin({
            filename:  'css/[name].css',
            allChunks:true
        }),
        new BaseHrefWebpackPlugin({ baseHref: './index.html' }),
        new HtmlWebpack({
            title:"CESRC后台管理系统",
            filename:"index.html",
            template: './dev/index.html',
            inject: true,
            hash:false,
            chunks:["common","app"]
        }),
        new HtmlWebpack({
            title:"CESRC后台管理系统",
            filename:"login.html",
            template: './dev/login.html',
            inject: true,
            chunks:["common", "login"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "js/commons.[hash:8].js"
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            echarts: "echarts"
        }),
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './dev/app/app.module#AppModule',
            sourceMap: true
        }),
        new WorkboxWebpack({
            globDirectory: './build/',
            globPatterns: ['**/*.{map,css,png,jpg,jpeg,svg,woff,woff2,ttf,eot,ico,js}'],
            globIgnores:["index.html"],
            swDest: './build/service-worker.js'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()

    ],
    devServer:{
        contentBase: path.join(__dirname, "build"),
        inline: true,
        port:4200,
        open:true,
        proxy: {
            "/mock/**": {
                target:"http://localhost:8090/demo-angular5-1/dev/mock/",
                secure: false,
                pathRewrite: {
                    '^/mock': ''
                }
            }
        },
        historyApiFallback: {
            index: 'index.html'
        }
    }
};
if(process.env.NODE_ENV == "prod"){
    module.exports.plugins.push(new UglifyJSPlugin())
}
