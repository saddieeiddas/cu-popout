/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const NAME = 'PopoutHandler';

import extend from 'extend';

export class PopoutHandler {

  constructor(options) {
    this.registered = false;
    this.parent = false;
    this.child = false;
    this.isParent = false;
    this.isChild = false;
    this.onopen = false;
    this.onclose = false;
    this.onunload = false;
    this.config = {
      closeChildOnUnload: true,
    };
    extend(true, this.config, options);
    this.register();
  }

  register() {
    if (this.registered === false) {
      this.registered = true;
      if (window.opener) {
        this.parent = window.opener;
        this.isChild = true;
      }
      if (window.onunload) {
        this.originalOnUnload = window.onunload;
      } else {
        this.originalOnUnload = false;
      }
      window.onunload = () => {
        this.handleUnload();
      };
      console.log(NAME, 'Registered');
    }
  }

  onUnload(callback) {
    this.onunload = callback;
  }

  handleUnload() {
    console.log(this);
    if (this.originalOnUnload) {
      this.originalOnUnload();
    }
    if (this.isParent) {
      if (this.child && this.config.closeChildOnUnload) {
        this.child.close();
      }
    }
    if (this.onunload) {
      this.onUnload();
    }
  }

  onClose(callback) {
    this.onclose = callback;
  }

  handleClose() {
    this.isParent = false;
    this.child = false;
    console.log(NAME, 'Child Popout Closed');
    if (this.onclose) {
      this.onclose();
    }
  }

  onOpen(callback) {
    this.onopen = callback;
  }

  handleOpen() {
    console.log(NAME, 'Child Popout Opened');
    if (this.onopen) {
      this.onopen();
    }
  }

  open() {
    if (this.isParent === false) {
      this.isParent = true;
      this.child = window.open(window.location.href, NAME + new Date().getTime());
      this.checkChildPopout = setInterval(() => {
        if (!this.child || this.child.closed === true) {
          clearInterval(this.checkChildPopout);
          this.handleClose();
        }
      }, 10);
      this.handleOpen();
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
