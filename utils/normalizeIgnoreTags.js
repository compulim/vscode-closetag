'use strict';

const HTML_VOID_ELEMENTS = {
  area    : true,
  base    : true,
  br      : true,
  col     : true,
  embed   : true,
  hr      : true,
  img     : true,
  input   : true,
  keygen  : true,
  link    : true,
  menuitem: true,
  meta    : true,
  param   : true,
  source  : true,
  track   : true,
  wbr     : true
};

function normalizeIgnoreTags(ignoreTags) {
  if (ignoreTags === 'html') {
    return HTML_VOID_ELEMENTS;
  } else if (!ignoreTags || typeof ignoreTags === 'string') {
    return {};
  } else if (Array.isArray(ignoreTags)) {
    return ignoreTags.reduce((result, name) => {
      result[name] = true;

      return result;
    }, {});
  } else {
    return ignoreTags;
  }
}

module.exports = normalizeIgnoreTags;

normalizeIgnoreTags.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
