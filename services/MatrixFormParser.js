const algo = require("./AllStableMatchings");

function getAllStableMatchings(prefsObj) {
  bigObj = prefsObj["bigPrefs"];
  litObj = prefsObj["litPrefs"];

  // head of each array into its own array
  bigArr = Object.keys(bigObj);
  litArr = Object.keys(litObj);

  // change each name in matrix to appropriate integer based on index
  bigMtx = Object.values(bigObj).map((outer) =>
    [0].concat(outer.map((inner) => litArr.indexOf(inner) + 1))
  );

  litMtx = Object.values(litObj).map((outer) =>
    [0].concat(outer.map((inner) => bigArr.indexOf(inner) + 1))
  );

  // // prepend an array of zeros of the same length
  bigMtx.unshift(Array(bigMtx[0].length).fill(0));
  litMtx.unshift(Array(litMtx[0].length).fill(0));

  // input into stable matching algorithm
  var matchings;
  if (bigMtx.length >= litMtx.length) {
    matchings = algo.allStableMatchings(
      bigMtx,
      litMtx,
      bigMtx.length - 1,
      litMtx.length - 1
    );
    matchings = matchings.map((outer) =>
      outer.map((inner) => [litArr[outer.indexOf(inner)], bigArr[inner - 1]])
    );
  } else {
    matchings = algo.allStableMatchings(
      litMtx,
      bigMtx,
      litMtx.length - 1,
      bigMtx.length - 1
    );
    matchings = matchings.map((outer) =>
      outer.map((inner) => [bigArr[outer.indexOf(inner)], litArr[inner - 1]])
    );
  }

  // all stable matchings produced
  // matchings[i][j] is the person that person j from the smaller group chooses.
  return matchings;
}

module.exports = { getAllStableMatchings };
