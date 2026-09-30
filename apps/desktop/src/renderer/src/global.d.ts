import type { ObDaviPreloadApi } from '../../preload/index';

declare global {
  interface Window {
    obDavi: ObDaviPreloadApi;
  }
}

export {};
