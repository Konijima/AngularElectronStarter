import { contextBridge } from 'electron'
import { IApplication } from './app'

const app: IApplication = {
  get nodeVersion() {
    return process.version
  },
}

contextBridge.exposeInMainWorld('app', app)
