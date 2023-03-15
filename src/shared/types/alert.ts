type Alert = {
  protocol: string,
  method: string,
  url: string,
  name: string,
  successCodes: Array<number>
  timeoutSeconds: number
  status: string
}

export default Alert;
