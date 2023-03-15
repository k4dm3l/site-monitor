import mongoose, { Schema } from 'mongoose';

const userPermissionsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  collection: 'userpermissions',
});

userPermissionsSchema.index({
  user: 1,
  permission: 1,
}, { unique: true });

const UserPermissions = mongoose.model('UserPermissions', userPermissionsSchema);
export default UserPermissions;
