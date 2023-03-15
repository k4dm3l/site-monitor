import { ICreateAlertContract } from './ICreateAlertContract';
import { IDeleteAlertContract } from './IDeleteAlertContract';
import { IGetAlertDetailsContract } from './IGetAlertDetailsContract';
import { IGetAlertsContract } from './IGetAlertsContract';

export interface IAlertServiceContract
  extends
  ICreateAlertContract,
  IDeleteAlertContract,
  IGetAlertDetailsContract,
  IGetAlertsContract {}
