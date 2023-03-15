export interface IProcessorContract {
  processAlertBatches: (batchSize: number) => Promise<void>
}
