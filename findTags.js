'use strict';

const TAG_PATTERN = />([0-9A-Za-z:\-_\.]*[A-Za-z\_])\/<|>\/[^\/]*?([0-9A-Za-z:\-_\.]*[A-Za-z\_])<|([0-9A-Za-z:\-_\.]*[A-Za-z\_])</g;

module.exports = function (popper) {
  let fragment = '';
  let line;

  while (typeof (line = popper()) === 'string') {
    fragment = line + ' ' + fragment;

    const tagFound = firstOpenTag(fragment);

    if (tagFound) {
      return tagFound;
    }
  }
};

function firstOpenTag(fragment) {
  let match;
  let tags = [];

  fragment = fragment.split('').reverse().join('');

  const pattern = new RegExp(TAG_PATTERN);

  while ((match = pattern.exec(fragment))) {
    const closeTag = match[1];
    const selfClosingTag = match[2];
    const openTag = match[3];

    if (closeTag) {
      tags.unshift(closeTag);
    } else if (openTag && openTag === tags[0]) {
      tags.shift();
    } else if (!selfClosingTag && !tags.length) {
      return openTag.split('').reverse().join('');
    }
  }
}
