const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27018/loginpage';

mongoose.connect(uri)
    .then(async () => {
        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const mahi = await User.findOne({ email: 'mahi@gmail.com' });
        if (mahi) {
            console.log('User mahi@gmail.com FOUND:');
            console.log(JSON.stringify(mahi, null, 2));
        } else {
            console.log('User mahi@gmail.com NOT FOUND');
        }

        const all = await User.find().sort({ _id: -1 }).limit(10);
        console.log('Total users:', await User.countDocuments());
        console.log('Last 10 users:', all.map(u => u.email));

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
