import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: String,
  password: String,
}, {
  toJSON: {
    virtuals: true,
  },
});
UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, comparisonResult) => {
    if (err) return callback(err);
    callback(null, comparisonResult);
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
