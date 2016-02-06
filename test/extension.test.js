/* global suite, test */

'use strict';

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
var assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
var vscode = require('vscode');
var myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', function () {
  test('Find tags', function () {
    let tags = myExtension.findTags('<abc></def><ghi></xyz>');

    assert.deepEqual(
      tags,
      [
        { tagName: 'abc', close: false },
        { tagName: 'def', close: true },
        { tagName: 'ghi', close: false },
        { tagName: 'xyz', close: true },
      ]
    );
  });

  test('Find first open tag', function () {
    let firstOpenTag = myExtension.firstOpenTag(
      myExtension.findTags('<abc></abc><def><ghi></ghi>').reverse()
    );

    assert.deepEqual(
      firstOpenTag,
      {
        tagName: 'def',
        close: false
      }
    );
  });

  test('Find first open tag with no result', function () {
    let firstOpenTag = myExtension.firstOpenTag(
      myExtension.findTags('<abc></abc><ghi></ghi>').reverse()
    );

    assert(!firstOpenTag);
  });
});
