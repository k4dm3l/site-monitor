import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
  },
  hashPassword: {
    type: String,
    required: true,
    trim: true,
  },
  tosAgreement: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
  collection: 'users',
});

const User = mongoose.model('User', userSchema);
export default User;
