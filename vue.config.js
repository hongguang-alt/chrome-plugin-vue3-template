const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join(__dirname, "src/manifest.json"),
      to: "manifest.json",
    },
  ],
});

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap((options) => {
        return {
          ...options,
          fallback: {
            loader: options.fallback.loader,
            options: {
              name: "img/[name].[ext]",
            },
          },
        };
      });
  },
  configureWebpack: {
    entry: {
      background: "./src/background/main.js",
    },
    output: {
      filename: "js/[name].js",
    },
    plugins: [copyPlugin],
  },
};
