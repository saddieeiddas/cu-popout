/** This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="tsd.d.ts" />

declare module 'cu-popout' {
  var libraryStatic: LibraryStatic;
  export = libraryStatic;
}

interface LibraryStatic {
  PopoutHandler: PopoutHandlerStatic;
}

interface PopoutHandlerStatic {
  new():PopoutHandler;
}

interface PopoutHandler {
}
