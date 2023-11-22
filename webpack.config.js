const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      // 이미지 로더
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "Asset/", // 폴더명
              name: "[name].[ext]", //[파일명][ext]
            },
          },
        ],
      },
      // 웹폰트 로더
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "Asset/", // 폴더명
              name: "[name].[ext]", //[파일명][ext]
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
    }),
  ],
};
