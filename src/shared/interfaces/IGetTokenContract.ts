export interface IGetTokenContract {
  getToken: (email: string, password: string) => Promise<string>
}
