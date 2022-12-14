export interface IUtilitiesContract {
  normalizePort: (port:string) => number | undefined,
  handlerFatalException: (error: any) => void
}
