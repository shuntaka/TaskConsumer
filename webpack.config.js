module.exports = {
  entry: __dirname + "/jobConsumer.js",
  target: 'node',
  output: {
    path: __dirname + "/public",
    filename: "jobConsumerBundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
