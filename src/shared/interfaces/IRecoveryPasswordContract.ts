export interface IRecoveryPasswordContract {
  recoveryPassword: (email: string) => Promise<void>
}
