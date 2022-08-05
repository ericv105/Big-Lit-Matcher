function allStableMatchings(prefsObj) {
  bigPrefMap = parsePrefs(prefsObj.bigMatrix);
  litPrefMap = parsePrefs(prefsObj.litMatrix);
  
}

function parsePrefs(matrix) {
  var prefMap = {};
  for (i = 0; i < matrix.length; i++) {
    prefMap[matrix[i][0]] = matrix[i].slice(1);
  }
  return prefMap;
}
module.exports = { allStableMatchings };


