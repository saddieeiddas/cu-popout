/**
 * Testing area for TypeScript definitions for library
 */

/// <reference path="./../lib/main.d.ts" />

import {PopoutHandler, PopoutHandlerOptions, PopoutEvents} from 'cu-popout';


var options: PopoutHandlerOptions = {};
options.closeChildOnUnload = true;

var popout = new PopoutHandler(options);

popout.on(PopoutEvents.CLOSE, () => {
});


popout.open();
popout.close();
popout.isMaster();
popout.isPopout();
popout.hasPopout();

