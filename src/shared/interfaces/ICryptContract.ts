export interface ICryptContract {
  hashPassword: (plainPassword: string) => Promise<string>;
  comparePassword: (plainPassword: string, hashedPassword: string) => Promise<boolean>
}
