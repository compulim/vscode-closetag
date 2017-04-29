'use strict';

const TAG_PATTERN = />([0-9A-Za-z:\-_\.]*[A-Za-z\_])\/<|>\/[^\/]*?([0-9A-Za-z:\-_\.]*[A-Za-z\_])<|([0-9A-Za-z:\-_\.]*[A-Za-z\_])</g;

module.exports = function (popper, options = {}) {
  let { ignoreTags } = options;
  let fragment = '';
  let line;

  options = {
    reversedIgnoreTags: (Array.isArray(ignoreTags) ? ignoreTags : []).map(tag => reverseString(tag))
  };

  while (typeof (line = popper()) === 'string') {
    fragment = line + ' ' + fragment;

    const tagFound = firstOpenTag(fragment, options);

    if (tagFound) {
      return tagFound;
    }
  }
};

function firstOpenTag(fragment, options) {
  const { reversedIgnoreTags } = options;
  let match;
  let tags = [];

  fragment = reverseString(fragment);

  const pattern = new RegExp(TAG_PATTERN);

  while ((match = pattern.exec(fragment))) {
    const closeTag = match[1];
    const selfClosingTag = match[2];
    const openTag = match[3];

    if (
      reversedIgnoreTags.includes(closeTag)
      || reversedIgnoreTags.includes(selfClosingTag)
      || reversedIgnoreTags.includes(openTag)
    ) {
      continue;
    }

    if (closeTag) {
      tags.unshift(closeTag);
    } else if (openTag && openTag === tags[0]) {
      tags.shift();
    } else if (!selfClosingTag && !tags.length) {
      return reverseString(openTag);
    }
  }
}

function reverseString(str) {
  return str.split('').reverse().join('');
}