const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 10)
    }
    next();
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.virtual('id').get(function(){
    return this._id;
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
