const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://divyansh:divyansh050@cluster0.pyiuj.mongodb.net/zara-server?retryWrites=true&w=majority"
  );
};