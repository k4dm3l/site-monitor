interface IUpdatePasswordPayload {
  verificationCode: number,
  newPassword: string,
  confirmationPassword: string
}

export interface IUpdatePasswordContract {
  updatePassword: (email: string, payload: IUpdatePasswordPayload) => Promise<void>
}
