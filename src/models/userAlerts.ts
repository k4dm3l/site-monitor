import mongoose, { Schema } from 'mongoose';

const userAlertsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  alert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  collection: 'useralerts',
});

const UserAlerts = mongoose.model('UserAlerts', userAlertsSchema);
export default UserAlerts;
