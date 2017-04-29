/* global describe, beforeEach, it */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
const findTags = require('../findTags');

// Defines a Mocha test suite to group tests of similar kind together
describe('Find tags', () => {
  describe('For "<html>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<html>']);

      result = findTags(popper);
    });

    it('should return "html"', () => assert.equal(result, 'html'));
  });

  describe('For "<html>\\n"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<html>', '']);

      result = findTags(popper);
    });

    it('should return "html"', () => assert.equal(result, 'html'));
  });

  describe('For "<html>\\n<head></head>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<html>', '<head></head>']);

      result = findTags(popper);
    });

    it('should return "html"', () => assert.equal(result, 'html'));
  });

  describe('For "<html>\\n<head>\\n</head>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<html>', '<head>', '</head>']);

      result = findTags(popper);
    });

    it('should return "html"', () => assert.equal(result, 'html'));
  });

  describe('For "<body>\\n<div abc="123">\\n</div>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<body>', '<div abc="123">', '</div>']);

      result = findTags(popper);
    });

    it('should return "body"', () => assert.equal(result, 'body'));
  });

  describe('For "<body>\\n<img />"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<body>', '<img />']);

      result = findTags(popper);
    });

    it('should return "body"', () => assert.equal(result, 'body'));
  });

  describe('For "<img\\n/>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<img', 'style=""', '/>']);

      result = findTags(popper);
    });

    it('should return "undefined"', () => assert(!result));
  });

  describe('For "  <img\\n    src="logo.png"\\n  />"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['  <span', '    style="top: 1px;"', '  >']);

      result = findTags(popper);
    });

    it('should return "span"', () => assert.equal(result, 'span'));
  });

  describe('For "<span>1 < 2"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<span>1 < 2']);

      result = findTags(popper);
    });

    it('should return "span"', () => assert.equal(result, 'span'));
  });

  describe('For "<input type={\'text\'}>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<input type={\'text\'}>']);

      result = findTags(popper);
    });

    it('should return "input"', () => assert.equal(result, 'input'));
  });

  describe('For "<123>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<123>']);

      result = findTags(popper);
    });

    it('should return "undefined"', () => assert.equal(typeof result, 'undefined'));
  });

  describe('For "<abc-xyz>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<abc-xyz>']);

      result = findTags(popper);
    });

    it('should return "abc-xyz"', () => assert.equal(result, 'abc-xyz'));
  });

  describe('For "<abc_xyz>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<abc_xyz>']);

      result = findTags(popper);
    });

    it('should return "abc_xyz"', () => assert.equal(result, 'abc_xyz'));
  });

  describe('For "<ns:xyz>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<ns:xyz>']);

      result = findTags(popper);
    });

    it('should return "ns:xyz"', () => assert.equal(result, 'ns:xyz'));
  });

  describe('For "<abc.xyz>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<abc.xyz>']);

      result = findTags(popper);
    });

    it('should return "abc.xyz"', () => assert.equal(result, 'abc.xyz'));
  });

  describe('For "<h1>"', () => {
    let popper, result;

    beforeEach(() => {
      popper = createPopper(['<h1>']);

      result = findTags(popper);
    });

    it('should return "h1"', () => assert.equal(result, 'h1'));
  });
});

function createPopper(lines) {
  return () => lines.pop();
}
