var path = require('path');
var webpack = require('webpack');

module.exports = {    
    // Here the application starts executing
    // and webpack starts bundling
    entry: "./public/js/paging.js", // string | object | array
  
    output: {
        path: path.resolve(__dirname, "public/js"), //Of use only after "webpack" command is ran
        publicPath: '/public/', //Of use only after "webpack-dev-server" command is ran
        filename: "bundle.js",        
    },

    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, "public/js")
                ],
                exclude: /node_modules/,
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include

                //issuer: { test, include, exclude },
                // conditions for the issuer (the origin of the import)

                //enforce: "pre",
                //enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)

                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide

                options: {
                    presets: ["es2015"]
                },
                // options for the loader
            }
        ]
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        modules: [
            "node_modules",
            // path.resolve(__dirname, "server")
        ],
        // directories where to look for modules

        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used   
  },  

  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "node", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

}