export interface IApplication {
  /**
   * Get current node version
   */
  get nodeVersion(): string
}

declare global {
  interface Window {
    /**
     * Exposed application interface
     */
    app: IApplication
  }
}
