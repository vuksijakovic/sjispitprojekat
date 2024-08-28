// webpack.config.js
const path = require('path');

module.exports = {
  entry: './index.js', // Tvoj glavni JS fajl
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // Gde će izlazni fajl biti smešten
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Opcionalno, ako koristiš Babel za transpile
        },
      },
    ],
  },
};
