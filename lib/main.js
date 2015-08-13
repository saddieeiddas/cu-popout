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

/**
 * Popout Events
 * @type {{UNLOAD: string, CLOSE: string, OPEN: string}}
 */
var PopoutEvents = {
  UNLOAD: 'UNLOAD',
  CLOSE: 'CLOSE',
  OPEN: 'OPEN'
};

exports.PopoutEvents = PopoutEvents;
/**
 * Handles opening and closing popouts
 * Emits Events for PopoutEvents
 * TODO
 */

var PopoutHandler = (function (_EventEmitter) {
  _inherits(PopoutHandler, _EventEmitter);

  /**
   * Detects popout state, and registers listeners
   * @param options
   */

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

  /**
   * Open this instance in a popout
   */

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

    /**
     * Close popouts
     */
  }, {
    key: 'close',
    value: function close() {
      if (this.isChild) {
        window.close();
      } else {
        // TODO implement a way for master instance to close all child popouts
      }
    }

    /**
     * Checks if this window instance is the Master meaning it is the parent of all popouts
     * @returns {boolean}
     */
  }, {
    key: 'isMaster',
    value: function isMaster() {
      return !this.isChild;
    }

    /**
     * Checks if this window instance is a popout
     * @returns {boolean}
     */
  }, {
    key: 'isPopout',
    value: function isPopout() {
      return this.isChild;
    }

    /**
     * Checks if this window has opened any popouts
     * @returns {boolean}
     */
  }, {
    key: 'hasPopout',
    value: function hasPopout() {
      return this.isParent;
    }
  }]);

  return PopoutHandler;
})(_events.EventEmitter);

exports.PopoutHandler = PopoutHandler;
//# sourceMappingURL=data:application/json;base64,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Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNvbnN0IE5BTUUgPSAnUG9wb3V0SGFuZGxlcic7XG5cbi8qKlxuICogUG9wb3V0IEV2ZW50c1xuICogQHR5cGUge3tVTkxPQUQ6IHN0cmluZywgQ0xPU0U6IHN0cmluZywgT1BFTjogc3RyaW5nfX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBvcG91dEV2ZW50cyA9IHtcbiAgVU5MT0FEOiAnVU5MT0FEJyxcbiAgQ0xPU0U6ICdDTE9TRScsXG4gIE9QRU46ICdPUEVOJyxcbn07XG5cbi8qKlxuICogSGFuZGxlcyBvcGVuaW5nIGFuZCBjbG9zaW5nIHBvcG91dHNcbiAqIEVtaXRzIEV2ZW50cyBmb3IgUG9wb3V0RXZlbnRzXG4gKiBUT0RPXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3BvdXRIYW5kbGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAvKipcbiAgICogRGV0ZWN0cyBwb3BvdXQgc3RhdGUsIGFuZCByZWdpc3RlcnMgbGlzdGVuZXJzXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudCA9IGZhbHNlO1xuICAgIHRoaXMuY2hpbGQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUGFyZW50ID0gZmFsc2U7XG4gICAgdGhpcy5pc0NoaWxkID0gZmFsc2U7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBjbG9zZUNoaWxkT25VbmxvYWQ6IHRydWUsXG4gICAgICB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICBoZWlnaHQ6ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgIG5hbWU6IE5BTUUgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIGludGVydmFsOiAzMDAsXG4gICAgfTtcbiAgICBleHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIG9wdGlvbnMpO1xuXG4gICAgLy8gZGV0ZWN0IGlmIHdpbmRvdyBpcyBhIGNoaWxkIHBvcG91dFxuICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XG4gICAgICB0aGlzLnBhcmVudCA9IHdpbmRvdy5vcGVuZXI7XG4gICAgICB0aGlzLmlzQ2hpbGQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHN0b3JlIHRoZSBvcmlnaW5hbCBvbnVubG9hZCBmdW5jdGlvbiBpZiBpdCBleGlzdHNcbiAgICBpZiAod2luZG93Lm9udW5sb2FkKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQgPSB3aW5kb3cub251bmxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZ2luYWxPblVubG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGJpbmQgYSBuZXcgb251bmxvYWQgZXZlbnQgdG8gZW1pdCB0aGUgVU5MT0FEIGV2ZW50XG4gICAgd2luZG93Lm9udW5sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0KFBvcG91dEV2ZW50cy5VTkxPQUQpO1xuICAgIH07XG5cbiAgICAvLyBoYW5kbGUgcG9wb3V0IGNsb3NpbmdcbiAgICB0aGlzLm9uKFBvcG91dEV2ZW50cy5DTE9TRSwgKCkgPT4ge1xuICAgICAgdGhpcy5pc1BhcmVudCA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGlsZCA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2coTkFNRSwgJ0NoaWxkIFBvcG91dCBDbG9zZWQnKTtcbiAgICB9KTtcblxuICAgIC8vIGhhbmRsZSBwb3BvdXQgb3BlbmluZ1xuICAgIHRoaXMub24oUG9wb3V0RXZlbnRzLk9QRU4sICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKE5BTUUsICdDaGlsZCBQb3BvdXQgT3BlbmVkJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoYW5kbGUgd2luZG93IHVubG9hZGluZ1xuICAgIHRoaXMub24oUG9wb3V0RXZlbnRzLlVOTE9BRCwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3JpZ2luYWxPblVubG9hZCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT25VbmxvYWQoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzUGFyZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkICYmIHRoaXMuY29uZmlnLmNsb3NlQ2hpbGRPblVubG9hZCkge1xuICAgICAgICAgIHRoaXMuY2hpbGQuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coTkFNRSwgJ1JlZ2lzdGVyZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoaXMgaW5zdGFuY2UgaW4gYSBwb3BvdXRcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNQYXJlbnQgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCB3aW5kb3dGZWF0dXJlcyA9ICd3aWR0aD0nICsgdGhpcy5jb25maWcud2lkdGggKyAnLGhlaWdodD0nICsgdGhpcy5jb25maWcuaGVpZ2h0O1xuICAgICAgdGhpcy5pc1BhcmVudCA9IHRydWU7XG4gICAgICB0aGlzLmNoaWxkID0gd2luZG93Lm9wZW4od2luZG93LmxvY2F0aW9uLmhyZWYsIHRoaXMuY29uZmlnLm5hbWUsIHdpbmRvd0ZlYXR1cmVzKTtcbiAgICAgIHRoaXMuY2hlY2tDaGlsZFBvcG91dCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkIHx8IHRoaXMuY2hpbGQuY2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrQ2hpbGRQb3BvdXQpO1xuICAgICAgICAgIHRoaXMuZW1pdChQb3BvdXRFdmVudHMuQ0xPU0UpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmNvbmZpZy5pbnRlcnZhbCk7XG4gICAgICB0aGlzLmVtaXQoUG9wb3V0RXZlbnRzLk9QRU4pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBwb3BvdXRzXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc0NoaWxkKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyBpbXBsZW1lbnQgYSB3YXkgZm9yIG1hc3RlciBpbnN0YW5jZSB0byBjbG9zZSBhbGwgY2hpbGQgcG9wb3V0c1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhpcyB3aW5kb3cgaW5zdGFuY2UgaXMgdGhlIE1hc3RlciBtZWFuaW5nIGl0IGlzIHRoZSBwYXJlbnQgb2YgYWxsIHBvcG91dHNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc01hc3RlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNDaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhpcyB3aW5kb3cgaW5zdGFuY2UgaXMgYSBwb3BvdXRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc1BvcG91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGlzIHdpbmRvdyBoYXMgb3BlbmVkIGFueSBwb3BvdXRzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzUG9wb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzUGFyZW50O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLyJ9