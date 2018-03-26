import { JSDOM } from 'jsdom';
const exposedProperties = ['window', 'navigator', 'document'];

const { window } = new JSDOM('');
global.window = window;
const { document } = window;
global.document = document;

Object.keys(window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.documentRef = document;
