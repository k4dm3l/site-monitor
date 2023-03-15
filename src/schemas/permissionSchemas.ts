import joi from 'joi';

import Scopes from '../shared/enums/scopes';
import Permissions from '../shared/enums/permissions';

const createPermissionSchema = joi.object().keys({
  active: joi.boolean(),
  scope: joi.string().valid(
    Scopes.ALERT,
    Scopes.PERMISSION,
    Scopes.USER,
  ),
  permission: joi.string().valid(
    Permissions.ALERT_CREATE,
    Permissions.ALERT_DEACTIVATE,
    Permissions.ALERT_DELETE,
    Permissions.ALERT_UPDATE,
    Permissions.PERMISSION_CREATE,
    Permissions.PERMISSION_DELETE,
    Permissions.PERMISSION_GET_DETAILS,
    Permissions.PERMISSION_LIST,
    Permissions.USER_CREATE,
    Permissions.USER_DEACTIVATE,
    Permissions.USER_DELETE,
    Permissions.USER_UPDATE,
    Permissions.USER_ADD_PERMISSION,
    Permissions.USER_REMOVE_PERMISSION,
    Permissions.USER_GET_DETAILS,
  ),
});

export default createPermissionSchema;
