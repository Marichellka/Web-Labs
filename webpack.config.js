const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './lab5/src/index.jsx',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, './lab5/src/dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './lab5/src/index.html',
		}),
		new Dotenv({
			systemvars: true,
		}),
	],
	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
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
					'postcss-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName:
                                    '[name]__[local]___[hash:base64:5]',
							},
						},
					},
					'postcss-loader',
					'sass-loader',
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
	stats: {
		children: true,
	},
};
