/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var NAME = 'PopoutHandler';

var PopoutHandler = (function () {
  function PopoutHandler(options) {
    _classCallCheck(this, PopoutHandler);

    this.registered = false;
    this.parent = false;
    this.child = false;
    this.isParent = false;
    this.isChild = false;
    this.onopen = false;
    this.onclose = false;
    this.onunload = false;
    this.config = {
      closeChildOnUnload: true
    };
    (0, _extend2['default'])(true, this.config, options);
    this.register();
  }

  _createClass(PopoutHandler, [{
    key: 'register',
    value: function register() {
      var _this = this;

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
        window.onunload = function () {
          _this.handleUnload();
        };
        console.log(NAME, 'Registered');
      }
    }
  }, {
    key: 'onUnload',
    value: function onUnload(callback) {
      this.onunload = callback;
    }
  }, {
    key: 'handleUnload',
    value: function handleUnload() {
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
  }, {
    key: 'onClose',
    value: function onClose(callback) {
      this.onclose = callback;
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.isParent = false;
      this.child = false;
      console.log(NAME, 'Child Popout Closed');
      if (this.onclose) {
        this.onclose();
      }
    }
  }, {
    key: 'onOpen',
    value: function onOpen(callback) {
      this.onopen = callback;
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen() {
      console.log(NAME, 'Child Popout Opened');
      if (this.onopen) {
        this.onopen();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      var _this2 = this;

      if (this.isParent === false) {
        this.isParent = true;
        this.child = window.open(window.location.href, NAME + new Date().getTime());
        this.checkChildPopout = setInterval(function () {
          if (!_this2.child || _this2.child.closed === true) {
            clearInterval(_this2.checkChildPopout);
            _this2.handleClose();
          }
        }, 10);
        this.handleOpen();
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.isChild) {
        window.close();
      }
    }
  }, {
    key: 'isMaster',
    value: function isMaster() {
      return !this.isChild;
    }
  }, {
    key: 'isPopout',
    value: function isPopout() {
      return this.isChild;
    }
  }, {
    key: 'hasPopout',
    value: function hasPopout() {
      return this.isParent;
    }
  }]);

  return PopoutHandler;
})();

exports.PopoutHandler = PopoutHandler;
//# sourceMappingURL=data:application/json;base64,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IjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmNvbnN0IE5BTUUgPSAnUG9wb3V0SGFuZGxlcic7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcblxuZXhwb3J0IGNsYXNzIFBvcG91dEhhbmRsZXIge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudCA9IGZhbHNlO1xuICAgIHRoaXMuY2hpbGQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUGFyZW50ID0gZmFsc2U7XG4gICAgdGhpcy5pc0NoaWxkID0gZmFsc2U7XG4gICAgdGhpcy5vbm9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLm9uY2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLm9udW5sb2FkID0gZmFsc2U7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBjbG9zZUNoaWxkT25VbmxvYWQ6IHRydWUsXG4gICAgfTtcbiAgICBleHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIG9wdGlvbnMpO1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKCkge1xuICAgIGlmICh0aGlzLnJlZ2lzdGVyZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB3aW5kb3cub3BlbmVyO1xuICAgICAgICB0aGlzLmlzQ2hpbGQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5vbnVubG9hZCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQgPSB3aW5kb3cub251bmxvYWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5vbnVubG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVVbmxvYWQoKTtcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZyhOQU1FLCAnUmVnaXN0ZXJlZCcpO1xuICAgIH1cbiAgfVxuXG4gIG9uVW5sb2FkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbnVubG9hZCA9IGNhbGxiYWNrO1xuICB9XG5cbiAgaGFuZGxlVW5sb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIGlmICh0aGlzLm9yaWdpbmFsT25VbmxvYWQpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxPblVubG9hZCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1BhcmVudCkge1xuICAgICAgaWYgKHRoaXMuY2hpbGQgJiYgdGhpcy5jb25maWcuY2xvc2VDaGlsZE9uVW5sb2FkKSB7XG4gICAgICAgIHRoaXMuY2hpbGQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMub251bmxvYWQpIHtcbiAgICAgIHRoaXMub25VbmxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBvbkNsb3NlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbmNsb3NlID0gY2FsbGJhY2s7XG4gIH1cblxuICBoYW5kbGVDbG9zZSgpIHtcbiAgICB0aGlzLmlzUGFyZW50ID0gZmFsc2U7XG4gICAgdGhpcy5jaGlsZCA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKE5BTUUsICdDaGlsZCBQb3BvdXQgQ2xvc2VkJyk7XG4gICAgaWYgKHRoaXMub25jbG9zZSkge1xuICAgICAgdGhpcy5vbmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgb25PcGVuKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbm9wZW4gPSBjYWxsYmFjaztcbiAgfVxuXG4gIGhhbmRsZU9wZW4oKSB7XG4gICAgY29uc29sZS5sb2coTkFNRSwgJ0NoaWxkIFBvcG91dCBPcGVuZWQnKTtcbiAgICBpZiAodGhpcy5vbm9wZW4pIHtcbiAgICAgIHRoaXMub25vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5pc1BhcmVudCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNQYXJlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5jaGlsZCA9IHdpbmRvdy5vcGVuKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBOQU1FICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgICAgdGhpcy5jaGVja0NoaWxkUG9wb3V0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY2hpbGQgfHwgdGhpcy5jaGlsZC5jbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tDaGlsZFBvcG91dCk7XG4gICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCk7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc0NoaWxkKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBpc01hc3RlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNDaGlsZDtcbiAgfVxuXG4gIGlzUG9wb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzQ2hpbGQ7XG4gIH1cblxuICBoYXNQb3BvdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNQYXJlbnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vIn0=