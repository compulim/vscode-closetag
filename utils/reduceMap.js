'use strict';

function reduceMap(map, reducer, initial) {
  return Object.keys(map).reduce((result, name) => {
    return reducer.call(map, result, map[name], name);
  }, initial);
}

module.exports = reduceMap;
