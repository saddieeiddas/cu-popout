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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

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
      closeChildOnUnload: true,
      width: (0, _jquery2['default'])(window).width(),
      height: (0, _jquery2['default'])(window).height(),
      name: NAME + new Date().getTime()
    };
    (0, _extend2['default'])(true, this.config, options);
    this.windowFeatures = 'width=' + this.config.width + ',height=' + this.config.height;
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
        this.child = window.open(window.location.href, this.config.name, this.windowFeatures);
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
//# sourceMappingURL=data:application/json;base64,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QUFFLENBQUM7T0FDbkI7S0FDRjs7O1dBRUksaUJBQUc7QUFDTixVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDaEIsY0FBTSxDQUFDLEtBQUssRUFBRSxDQUFDO09BQ2hCO0tBQ0Y7OztXQUVPLG9CQUFHO0FBQ1QsYUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdEI7OztXQUVPLG9CQUFHO0FBQ1QsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7V0FFUSxxQkFBRztBQUNWLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7O1NBbEhVLGFBQWEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjb25zdCBOQU1FID0gJ1BvcG91dEhhbmRsZXInO1xuXG5leHBvcnQgY2xhc3MgUG9wb3V0SGFuZGxlciB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyZW50ID0gZmFsc2U7XG4gICAgdGhpcy5jaGlsZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNQYXJlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2hpbGQgPSBmYWxzZTtcbiAgICB0aGlzLm9ub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMub25jbG9zZSA9IGZhbHNlO1xuICAgIHRoaXMub251bmxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGNsb3NlQ2hpbGRPblVubG9hZDogdHJ1ZSxcbiAgICAgIHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSxcbiAgICAgIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgbmFtZTogTkFNRSArIG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgIH07XG4gICAgZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBvcHRpb25zKTtcbiAgICB0aGlzLndpbmRvd0ZlYXR1cmVzID0gJ3dpZHRoPScgKyB0aGlzLmNvbmZpZy53aWR0aCArICcsaGVpZ2h0PScgKyB0aGlzLmNvbmZpZy5oZWlnaHQ7XG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICB9XG5cbiAgcmVnaXN0ZXIoKSB7XG4gICAgaWYgKHRoaXMucmVnaXN0ZXJlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICBpZiAod2luZG93Lm9wZW5lcikge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHdpbmRvdy5vcGVuZXI7XG4gICAgICAgIHRoaXMuaXNDaGlsZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93Lm9udW5sb2FkKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxPblVubG9hZCA9IHdpbmRvdy5vbnVubG9hZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxPblVubG9hZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgd2luZG93Lm9udW5sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZVVubG9hZCgpO1xuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKE5BTUUsICdSZWdpc3RlcmVkJyk7XG4gICAgfVxuICB9XG5cbiAgb25VbmxvYWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9udW5sb2FkID0gY2FsbGJhY2s7XG4gIH1cblxuICBoYW5kbGVVbmxvYWQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgaWYgKHRoaXMub3JpZ2luYWxPblVubG9hZCkge1xuICAgICAgdGhpcy5vcmlnaW5hbE9uVW5sb2FkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUGFyZW50KSB7XG4gICAgICBpZiAodGhpcy5jaGlsZCAmJiB0aGlzLmNvbmZpZy5jbG9zZUNoaWxkT25VbmxvYWQpIHtcbiAgICAgICAgdGhpcy5jaGlsZC5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vbnVubG9hZCkge1xuICAgICAgdGhpcy5vblVubG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xvc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uY2xvc2UgPSBjYWxsYmFjaztcbiAgfVxuXG4gIGhhbmRsZUNsb3NlKCkge1xuICAgIHRoaXMuaXNQYXJlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmNoaWxkID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coTkFNRSwgJ0NoaWxkIFBvcG91dCBDbG9zZWQnKTtcbiAgICBpZiAodGhpcy5vbmNsb3NlKSB7XG4gICAgICB0aGlzLm9uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBvbk9wZW4oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9ub3BlbiA9IGNhbGxiYWNrO1xuICB9XG5cbiAgaGFuZGxlT3BlbigpIHtcbiAgICBjb25zb2xlLmxvZyhOQU1FLCAnQ2hpbGQgUG9wb3V0IE9wZW5lZCcpO1xuICAgIGlmICh0aGlzLm9ub3Blbikge1xuICAgICAgdGhpcy5vbm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzUGFyZW50ID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5pc1BhcmVudCA9IHRydWU7XG4gICAgICB0aGlzLmNoaWxkID0gd2luZG93Lm9wZW4od2luZG93LmxvY2F0aW9uLmhyZWYsIHRoaXMuY29uZmlnLm5hbWUsIHRoaXMud2luZG93RmVhdHVyZXMpO1xuICAgICAgdGhpcy5jaGVja0NoaWxkUG9wb3V0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY2hpbGQgfHwgdGhpcy5jaGlsZC5jbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tDaGlsZFBvcG91dCk7XG4gICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCk7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc0NoaWxkKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBpc01hc3RlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNDaGlsZDtcbiAgfVxuXG4gIGlzUG9wb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzQ2hpbGQ7XG4gIH1cblxuICBoYXNQb3BvdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNQYXJlbnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vIn0=