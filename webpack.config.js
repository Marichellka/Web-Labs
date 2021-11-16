const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './lab3/scripts/script.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, './lab3/dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './lab3/index.html',
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
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
				],
			},
			{
				test: /.png|svg|jpg|gif$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: path.resolve(__dirname, './imgs'),
							outputPath: '/imgs',
							name: '[name].[ext]',
							useRelativePaths: true,
						},
					},
				],
			},
		],
	},
};
