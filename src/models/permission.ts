import mongoose, { Schema } from 'mongoose';

import Scopes from '../shared/enums/scopes';
import Permissions from '../shared/enums/permissions';

const permissionSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  scope: {
    type: String,
    required: true,
    enum: Scopes,
  },
  permission: {
    type: String,
    required: true,
    unique: true,
    enum: Permissions,
  },
}, {
  timestamps: true,
  collection: 'permissions',
});

permissionSchema.index({
  scope: 1,
  permission: 1,
}, { unique: true });

const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;
