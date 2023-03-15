export interface IUtilitiesContract {
  normalizePort: (port:string) => number | undefined,
  handlerFatalException: (error: any) => void
  compressLogs: (logId: string, logFileName: string) => Promise<void>
}
