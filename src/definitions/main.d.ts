/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="tsd.d.ts" />

declare module 'cu-popout' {

  export class PopoutEvents {
    static OPEN: string;
    static CLOSE: string;
    static UNLOAD: string;
  }

  export class PopoutHandler implements NodeJS.EventEmitter {
    constructor(options?: PopoutHandlerOptions);

    open(): void;
    close(): void;
    isMaster(): boolean;
    isPopout(): boolean;
    hasPopout(): boolean;

    addListener(event: string, listener: Function): NodeJS.EventEmitter;
    on(event: string, listener: Function): NodeJS.EventEmitter;
    once(event: string, listener: Function): NodeJS.EventEmitter;
    removeListener(event: string, listener: Function): NodeJS.EventEmitter;
    removeAllListeners(event?: string): NodeJS.EventEmitter;
    setMaxListeners(n: number): void;
    listeners(event: string): Function[];
    emit(event: string, ...args: any[]): boolean;
  }

  export interface PopoutHandlerOptions {
    closeChildOnUnload?: boolean;
    width?: number;
    height?: number;
    name?: string;
    interval?: number;
  }

}
