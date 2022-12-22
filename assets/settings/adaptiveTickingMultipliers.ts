export interface AdaptiveTickSettings {
  hidden: number,
  visible: number,
}

export default {
  traditional: {
    hidden: 60, // 60 seconds
    visible: 1
  } as AdaptiveTickSettings,
  approximate: {
    hidden: 5 * 60, // 5 minutes
    visible: 30 // 30 seconds
  } as AdaptiveTickSettings,
  percentage: {
    hidden: 20, // 20 seconds
    visible: 2 // 2 seconds
  }as AdaptiveTickSettings
}
