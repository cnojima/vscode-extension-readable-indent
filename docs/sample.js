/* eslint-disable */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');
const l = require('../util/log');
const chapterCleanup = require('../util/chapter-cleanup');
const getCollection = require('./get-collection');
const pupOptions = require('../config/puppeteer');
const cookies = require('../config/rco-to/cookies');

const pkg = {
  "devDependencies": {
    "eslint": "^5.15.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.16.0",
    "expect.js": "^0.3.1",
    "husky": "^1.3.1",
    "mocha": "^6.0.2"
  }
};