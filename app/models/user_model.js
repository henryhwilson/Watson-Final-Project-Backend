import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';

// new schema, posts w/ field
const UserSchema = new Schema({
  phone: { type: Number, unique: true },
  password: String,
});

UserSchema.pre('save', function beforeSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      return next();
    });
  });
});

//

// note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// create a class for the model
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
