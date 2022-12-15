import mongoose, { Schema } from 'mongoose';

import Methods from '../shared/enums/methods';
import Protocols from '../shared/enums/protocols';

const alertSchema = new Schema({
  protocol: {
    type: String,
    required: true,
    trim: true,
    enum: Protocols,
  },
  method: {
    type: String,
    required: true,
    trim: true,
    enum: Methods,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  successCodes: [],
  timeoutSeconds: {
    type: Number,
    required: true,
    min: 3,
    max: 10,
    default: 5,
  },
  status: {
    type: String,
    required: true,
    enum: {
      up: 'UP',
      down: 'DOWN',
    },
  },
  lastCheckAlert: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  collection: 'alerts',
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
