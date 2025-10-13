const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Astroolooger:wrnSlop1bP7goic1@astrologer-1.6sbe2eb.mongodb.net/?retryWrites=true&w=majority&appName=Astrologer-1", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    
    process.exit(1);
  }
};

module.exports = connectDB;
