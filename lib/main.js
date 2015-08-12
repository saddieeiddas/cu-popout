/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var NAME = 'PopoutHandler';

var PopoutEvents = {
  UNLOAD: 'UNLOAD',
  CLOSE: 'CLOSE',
  OPEN: 'OPEN'
};

exports.PopoutEvents = PopoutEvents;

var PopoutHandler = (function (_EventEmitter) {
  _inherits(PopoutHandler, _EventEmitter);

  function PopoutHandler(options) {
    var _this = this;

    _classCallCheck(this, PopoutHandler);

    _get(Object.getPrototypeOf(PopoutHandler.prototype), 'constructor', this).call(this);
    this.registered = false;
    this.parent = false;
    this.child = false;
    this.isParent = false;
    this.isChild = false;
    this.config = {
      closeChildOnUnload: true,
      width: (0, _jquery2['default'])(window).width(),
      height: (0, _jquery2['default'])(window).height(),
      name: NAME + new Date().getTime(),
      interval: 300
    };
    (0, _extend2['default'])(true, this.config, options);

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
    window.onunload = function () {
      _this.emit(PopoutEvents.UNLOAD);
    };

    // handle popout closing
    this.on(PopoutEvents.CLOSE, function () {
      _this.isParent = false;
      _this.child = false;
      console.log(NAME, 'Child Popout Closed');
    });

    // handle popout opening
    this.on(PopoutEvents.OPEN, function () {
      console.log(NAME, 'Child Popout Opened');
    });

    // handle window unloading
    this.on(PopoutEvents.UNLOAD, function () {
      if (_this.originalOnUnload) {
        _this.originalOnUnload();
      }
      if (_this.isParent) {
        if (_this.child && _this.config.closeChildOnUnload) {
          _this.child.close();
        }
      }
    });

    console.log(NAME, 'Registered');
  }

  _createClass(PopoutHandler, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      if (this.isParent === false) {
        var windowFeatures = 'width=' + this.config.width + ',height=' + this.config.height;
        this.isParent = true;
        this.child = window.open(window.location.href, this.config.name, windowFeatures);
        this.checkChildPopout = setInterval(function () {
          if (!_this2.child || _this2.child.closed === true) {
            clearInterval(_this2.checkChildPopout);
            _this2.emit(PopoutEvents.CLOSE);
          }
        }, this.config.interval);
        this.emit(PopoutEvents.OPEN);
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
})(_events.EventEmitter);

exports.PopoutHandler = PopoutHandler;
//# sourceMappingURL=data:application/json;base64,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IEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNvbnN0IE5BTUUgPSAnUG9wb3V0SGFuZGxlcic7XG5cbmV4cG9ydCBjb25zdCBQb3BvdXRFdmVudHMgPSB7XG4gIFVOTE9BRDogJ1VOTE9BRCcsXG4gIENMT1NFOiAnQ0xPU0UnLFxuICBPUEVOOiAnT1BFTicsXG59O1xuXG5leHBvcnQgY2xhc3MgUG9wb3V0SGFuZGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmNoaWxkID0gZmFsc2U7XG4gICAgdGhpcy5pc1BhcmVudCA9IGZhbHNlO1xuICAgIHRoaXMuaXNDaGlsZCA9IGZhbHNlO1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgY2xvc2VDaGlsZE9uVW5sb2FkOiB0cnVlLFxuICAgICAgd2lkdGg6ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICBuYW1lOiBOQU1FICsgbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICBpbnRlcnZhbDogMzAwLFxuICAgIH07XG4gICAgZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBvcHRpb25zKTtcblxuICAgIC8vIGRldGVjdCBpZiB3aW5kb3cgaXMgYSBjaGlsZCBwb3BvdXRcbiAgICBpZiAod2luZG93Lm9wZW5lcikge1xuICAgICAgdGhpcy5wYXJlbnQgPSB3aW5kb3cub3BlbmVyO1xuICAgICAgdGhpcy5pc0NoaWxkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzdG9yZSB0aGUgb3JpZ2luYWwgb251bmxvYWQgZnVuY3Rpb24gaWYgaXQgZXhpc3RzXG4gICAgaWYgKHdpbmRvdy5vbnVubG9hZCkge1xuICAgICAgdGhpcy5vcmlnaW5hbE9uVW5sb2FkID0gd2luZG93Lm9udW5sb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGEgbmV3IG9udW5sb2FkIGV2ZW50IHRvIGVtaXQgdGhlIFVOTE9BRCBldmVudFxuICAgIHdpbmRvdy5vbnVubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZW1pdChQb3BvdXRFdmVudHMuVU5MT0FEKTtcbiAgICB9O1xuXG4gICAgLy8gaGFuZGxlIHBvcG91dCBjbG9zaW5nXG4gICAgdGhpcy5vbihQb3BvdXRFdmVudHMuQ0xPU0UsICgpID0+IHtcbiAgICAgIHRoaXMuaXNQYXJlbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2hpbGQgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUubG9nKE5BTUUsICdDaGlsZCBQb3BvdXQgQ2xvc2VkJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoYW5kbGUgcG9wb3V0IG9wZW5pbmdcbiAgICB0aGlzLm9uKFBvcG91dEV2ZW50cy5PUEVOLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhOQU1FLCAnQ2hpbGQgUG9wb3V0IE9wZW5lZCcpO1xuICAgIH0pO1xuXG4gICAgLy8gaGFuZGxlIHdpbmRvdyB1bmxvYWRpbmdcbiAgICB0aGlzLm9uKFBvcG91dEV2ZW50cy5VTkxPQUQsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLm9yaWdpbmFsT25VbmxvYWQpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbE9uVW5sb2FkKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1BhcmVudCkge1xuICAgICAgICBpZiAodGhpcy5jaGlsZCAmJiB0aGlzLmNvbmZpZy5jbG9zZUNoaWxkT25VbmxvYWQpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKE5BTUUsICdSZWdpc3RlcmVkJyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzUGFyZW50ID09PSBmYWxzZSkge1xuICAgICAgY29uc3Qgd2luZG93RmVhdHVyZXMgPSAnd2lkdGg9JyArIHRoaXMuY29uZmlnLndpZHRoICsgJyxoZWlnaHQ9JyArIHRoaXMuY29uZmlnLmhlaWdodDtcbiAgICAgIHRoaXMuaXNQYXJlbnQgPSB0cnVlO1xuICAgICAgdGhpcy5jaGlsZCA9IHdpbmRvdy5vcGVuKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0aGlzLmNvbmZpZy5uYW1lLCB3aW5kb3dGZWF0dXJlcyk7XG4gICAgICB0aGlzLmNoZWNrQ2hpbGRQb3BvdXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5jaGlsZCB8fCB0aGlzLmNoaWxkLmNsb3NlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja0NoaWxkUG9wb3V0KTtcbiAgICAgICAgICB0aGlzLmVtaXQoUG9wb3V0RXZlbnRzLkNMT1NFKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5jb25maWcuaW50ZXJ2YWwpO1xuICAgICAgdGhpcy5lbWl0KFBvcG91dEV2ZW50cy5PUEVOKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc0NoaWxkKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBpc01hc3RlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNDaGlsZDtcbiAgfVxuXG4gIGlzUG9wb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzQ2hpbGQ7XG4gIH1cblxuICBoYXNQb3BvdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNQYXJlbnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi4vIn0=