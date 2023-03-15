export interface IUpdateUserPermissionsContract {
  updateUserPermission: (user: string, permissions: Array<string>) => Promise<Array<{
    user: string,
    permission: string,
    error: boolean
  }>>
}
