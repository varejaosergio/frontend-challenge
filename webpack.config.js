module.exports = {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "login-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
                sassOptions: {
                    fiber: require("fibers"),
                }
              },
            },
          ],
        },
      ],
    },
};