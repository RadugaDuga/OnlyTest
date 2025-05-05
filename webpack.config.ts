import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(process.cwd(), "dist"),
		filename: "[name].[contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					process.env.NODE_ENV === "production"
						? MiniCssExtractPlugin.loader
						: "style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				use: [
					process.env.NODE_ENV === "production"
						? MiniCssExtractPlugin.loader
						: "style-loader",
					"css-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			favicon: "./src/favicon.ico",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
	],
	devServer: {
		static: {
			directory: path.join(process.cwd(), "dist"),
		},
		hot: true,
		port: 3000,
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\/](react|react-dom|swiper|gsap)[\/]/,
					name: "vendor",
					chunks: "all",
				},
			},
		},
	},
};
