const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userDetailsSchema = new mongoose.Schema({
    selectedWing: {
        type: String
    },
    roomNo: {
        type: String
    },
    name: {
        type: String
    },
    adharNo: {
        type: String
    },
    mobile: {
        type: String
    },
    doj: {
        type: Date
    },
    deposit: {
        type: String
    },
    rent: {
        type: String
    },
    subPersonName: {
        type: String
    },
    subPersonMobile: {
        type: String
    },
    password: {
        type: String
    },
    create_date: {
        type: Date,
        Date: Date.now
    },
    saltSecret: String
});

// Events
userDetailsSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userDetailsSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserDetails = module.exports = mongoose.model('userDetails', userDetailsSchema);

module.exports.get = function (callback, limit) {
    UserDetails.find(callback).limit(limit);
}
