/* global describe, it */

'use strict';

const assert              = require('assert');
const normalizeIgnoreTags = require('../utils/normalizeIgnoreTags');

describe('Normalize ignore tags', () => {
  describe('Normalize null', () => {
    it('should return {}', () => {
      assert.deepEqual(
        normalizeIgnoreTags(null),
        {}
      );
    });
  });

  describe('Normalize "html"', () => {
    it('should return HTML_VOID_ELEMENTS', () => {
      assert.deepEqual(
        normalizeIgnoreTags('html'),
        normalizeIgnoreTags.HTML_VOID_ELEMENTS
      );
    });
  });

  describe('Normalize ["br", "img"]', () => {
    it('should return { br: true, img: true }', () => {
      assert.deepEqual(
        normalizeIgnoreTags(['br', 'img']),
        {
          br : true,
          img: true
        }
      );
    });
  });

  describe('Normalize { br: true, img: true }', () => {
    it('should return { br: true, img: true }', () => {
      assert.deepEqual(
        normalizeIgnoreTags({
          br : true,
          img: true
        }),
        {
          br : true,
          img: true
        }
      );
    });
  });
});
