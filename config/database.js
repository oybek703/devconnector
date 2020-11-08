const mongoose = require('mongoose');
const config = require('config');
const MONGO_URI = config.get('MONGO_URI');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
            );
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
