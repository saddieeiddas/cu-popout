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

exports.NAME = NAME;

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
        // TODO add features here https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Position_and_size_features
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
//# sourceMappingURL=data:application/json;base64,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aWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcblxuZXhwb3J0IGNvbnN0IE5BTUUgPSAnUG9wb3V0SGFuZGxlcic7XG5cbmV4cG9ydCBjbGFzcyBQb3BvdXRIYW5kbGVyIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5yZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmNoaWxkID0gZmFsc2U7XG4gICAgdGhpcy5pc1BhcmVudCA9IGZhbHNlO1xuICAgIHRoaXMuaXNDaGlsZCA9IGZhbHNlO1xuICAgIHRoaXMub25vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5vbmNsb3NlID0gZmFsc2U7XG4gICAgdGhpcy5vbnVubG9hZCA9IGZhbHNlO1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgY2xvc2VDaGlsZE9uVW5sb2FkOiB0cnVlLFxuICAgIH07XG4gICAgZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBvcHRpb25zKTtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICByZWdpc3RlcigpIHtcbiAgICBpZiAodGhpcy5yZWdpc3RlcmVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XG4gICAgICAgIHRoaXMucGFyZW50ID0gd2luZG93Lm9wZW5lcjtcbiAgICAgICAgdGhpcy5pc0NoaWxkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cub251bmxvYWQpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbE9uVW5sb2FkID0gd2luZG93Lm9udW5sb2FkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbE9uVW5sb2FkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB3aW5kb3cub251bmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlVW5sb2FkKCk7XG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2coTkFNRSwgJ1JlZ2lzdGVyZWQnKTtcbiAgICB9XG4gIH1cblxuICBvblVubG9hZChjYWxsYmFjaykge1xuICAgIHRoaXMub251bmxvYWQgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGhhbmRsZVVubG9hZCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICBpZiAodGhpcy5vcmlnaW5hbE9uVW5sb2FkKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNQYXJlbnQpIHtcbiAgICAgIGlmICh0aGlzLmNoaWxkICYmIHRoaXMuY29uZmlnLmNsb3NlQ2hpbGRPblVubG9hZCkge1xuICAgICAgICB0aGlzLmNoaWxkLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9udW5sb2FkKSB7XG4gICAgICB0aGlzLm9uVW5sb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgb25DbG9zZShjYWxsYmFjaykge1xuICAgIHRoaXMub25jbG9zZSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgdGhpcy5pc1BhcmVudCA9IGZhbHNlO1xuICAgIHRoaXMuY2hpbGQgPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhOQU1FLCAnQ2hpbGQgUG9wb3V0IENsb3NlZCcpO1xuICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcbiAgICAgIHRoaXMub25jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3BlbihjYWxsYmFjaykge1xuICAgIHRoaXMub25vcGVuID0gY2FsbGJhY2s7XG4gIH1cblxuICBoYW5kbGVPcGVuKCkge1xuICAgIGNvbnNvbGUubG9nKE5BTUUsICdDaGlsZCBQb3BvdXQgT3BlbmVkJyk7XG4gICAgaWYgKHRoaXMub25vcGVuKSB7XG4gICAgICB0aGlzLm9ub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNQYXJlbnQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzUGFyZW50ID0gdHJ1ZTtcbiAgICAgIC8vIFRPRE8gYWRkIGZlYXR1cmVzIGhlcmUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9vcGVuI1Bvc2l0aW9uX2FuZF9zaXplX2ZlYXR1cmVzXG4gICAgICB0aGlzLmNoaWxkID0gd2luZG93Lm9wZW4od2luZG93LmxvY2F0aW9uLmhyZWYsIE5BTUUgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICB0aGlzLmNoZWNrQ2hpbGRQb3BvdXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5jaGlsZCB8fCB0aGlzLmNoaWxkLmNsb3NlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja0NoaWxkUG9wb3V0KTtcbiAgICAgICAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcbiAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmlzQ2hpbGQpIHtcbiAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFzdGVyKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0NoaWxkO1xuICB9XG5cbiAgaXNQb3BvdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDaGlsZDtcbiAgfVxuXG4gIGhhc1BvcG91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1BhcmVudDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLi8ifQ==