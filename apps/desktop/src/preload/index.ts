import { contextBridge, ipcRenderer } from 'electron';

const api = {
  getVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
  chooseProjectToOpen: (): Promise<string | null> => ipcRenderer.invoke('project:choose-open'),
  chooseProjectToCreate: (): Promise<string | null> => ipcRenderer.invoke('project:choose-create'),
};

contextBridge.exposeInMainWorld('obDavi', api);

export type ObDaviPreloadApi = typeof api;
