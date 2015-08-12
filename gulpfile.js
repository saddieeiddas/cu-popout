/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var gulp = require('gulp');

var buildConfig = require('./cu-build.config.js');

require('cu-build-tools').auto(gulp, buildConfig);
