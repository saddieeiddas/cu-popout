/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {EventEmitter} from 'events';
import extend from 'extend';
import $ from 'jquery';

const NAME = 'PopoutHandler';

export const PopoutEvents = {
  UNLOAD: 'UNLOAD',
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};

export class PopoutHandler extends EventEmitter {

  constructor(options) {
    super();
    this.registered = false;
    this.parent = false;
    this.child = false;
    this.isParent = false;
    this.isChild = false;
    this.config = {
      closeChildOnUnload: true,
      width: $(window).width(),
      height: $(window).height(),
      name: NAME + new Date().getTime(),
      interval: 300,
    };
    extend(true, this.config, options);

    // detect if window is a child popout
    if (window.opener) {
      this.parent = window.opener;
      this.isChild = true;
    }

    // store the original onunload function if it exists
    if (window.onunload) {
      this.originalOnUnload = window.onunload;
    } else {
      this.originalOnUnload = false;
    }

    // bind a new onunload event to emit the UNLOAD event
    window.onunload = () => {
      this.emit(PopoutEvents.UNLOAD);
    };

    // handle popout closing
    this.on(PopoutEvents.CLOSE, () => {
      this.isParent = false;
      this.child = false;
      console.log(NAME, 'Child Popout Closed');
    });

    // handle popout opening
    this.on(PopoutEvents.OPEN, () => {
      console.log(NAME, 'Child Popout Opened');
    });

    // handle window unloading
    this.on(PopoutEvents.UNLOAD, () => {
      if (this.originalOnUnload) {
        this.originalOnUnload();
      }
      if (this.isParent) {
        if (this.child && this.config.closeChildOnUnload) {
          this.child.close();
        }
      }
    });

    console.log(NAME, 'Registered');
  }

  open() {
    if (this.isParent === false) {
      const windowFeatures = 'width=' + this.config.width + ',height=' + this.config.height;
      this.isParent = true;
      this.child = window.open(window.location.href, this.config.name, windowFeatures);
      this.checkChildPopout = setInterval(() => {
        if (!this.child || this.child.closed === true) {
          clearInterval(this.checkChildPopout);
          this.emit(PopoutEvents.CLOSE);
        }
      }, this.config.interval);
      this.emit(PopoutEvents.OPEN);
    }
  }

  close() {
    if (this.isChild) {
      window.close();
    }
  }

  isMaster() {
    return !this.isChild;
  }

  isPopout() {
    return this.isChild;
  }

  hasPopout() {
    return this.isParent;
  }
}
