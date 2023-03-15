export interface IDeleteAlertContract {
  deleteAlert: (alertId: string, userId: string) => Promise<void>
}

export default IDeleteAlertContract;
