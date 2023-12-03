const {
	resolve
} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	// 如果你是开发的话用mode=development   上线的话使用mode=production
	mode: 'development',
	// 自己根据自己的js所在目录修改  ./是此文件所在目录
	entry: './src/index.js',
	output: {
		filename: 'build.js',
		path: resolve(__dirname, 'build'),
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
			use: ['url-loader']
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			// 自己根据自己的html所在目录修改  ./是此文件所在目录
			template: './src/index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [{
					from: 'node_modules/cesium/Build/Cesium/Workers',
					to: 'Workers'
				},
				{
					from: 'node_modules/cesium/Build/Cesium/ThirdParty',
					to: 'ThirdParty'
				},
				{
					from: 'node_modules/cesium/Build/Cesium/Assets',
					to: 'Assets'
				},
				{
					from: 'node_modules/cesium/Build/Cesium/Widgets',
					to: 'Widgets'
				}
			],
		}),
		new webpack.DefinePlugin({
			// Define relative base path in cesium for loading assets
			CESIUM_BASE_URL: JSON.stringify('')
		})
	],
	devServer: {
		contentBase:resolve(__dirname, "build")
		// compress:true,
		// port:3000,
		// open:true
	},
};