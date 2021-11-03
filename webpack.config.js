const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './lab2/script.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, './lab2/dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './lab2/index.html',
		}),
	],
	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: require.resolve('babel-loader'),
			},
		],
	},
};
