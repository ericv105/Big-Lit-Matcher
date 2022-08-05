/* 
  All Stable Matchings algorithm adapted from:
  Authors: McVitie, D.G., Wilson, L.B. Stable
  Date: 1970
  Title: Stable marriage assignment for unequal sets: Appendix C
  Publisher: Springer
  URL: https://link.springer.com/article/10.1007/BF01934199
*/

function allStableMatchings(choicenk, choicekn, n, k) {
  function breakMarriage(malecounter, marriage, i, count) {
    // breaks the marriage of person i
    var malecounterCopy = [...malecounter];
    var marriageCopy = [...marriage];
    marriageCopy[choicenk[i][malecounterCopy[i] - 1]] = -i;
    proposal(i, malecounterCopy, marriageCopy, count);
    if (!success) {
      unchanged[i] = false;
      return;
    }
    console.log(marriageCopy);
    for (let j = i; j <= n - 1; j++) {
      breakMarriage(malecounterCopy, marriageCopy, j, count);
    }
    for (let j = i + 1; j <= n - 1; j++) {
      unchanged[j] = true;
    }
  }

  function proposal(i, malec, marriage, c) {
    /* in this function, man/woman i proposes to the next woman/man
    in his/her preference list, and calls the function refusal()
    for this woman/man. If i is negative on entry then a successful
    breakMarriage() operation has been completed and a new stable 
    marriage found. If the boolean success is made false during
    a breakMarriage() operation then it means that this breakMarriage()
    has failed; */

    if (i < 0) {
      success = true;
    } else if (i === 0 || malec[i] === k + 1 || !unchanged[i]) {
      success = false;
    } else {
      c += 1;
      var j = malec[i];
      malec[i] = j + 1;
      refusal(i, choicenk[i][j], malec, marriage, c);
    }
  }

  function refusal(i, j, malec, marriage, c) {
    /* this function decides which of the two proposals, the one
    being kept in suspense or the one just received, should be retained.
    Whichever is rejected goes back to the function proposal() to make
    the next proposal. */
    if (choice[j][Math.abs(marriage[j])] > choice[j][i]) {
      // if marriage[j] == 0, this body will always execute
      var s = marriage[j];
      marriage[j] = i;
      proposal(s, malec, marriage, c);
    } else {
      proposal(i, malec, marriage, c);
    }
  }

  var marriage = new Array(k + 1);
  var counter = new Array(n + 1);
  var choice = new Array(k + 1).fill(0).map(() => new Array(n + 1).fill(0));
  var unchanged = new Array(n + 1);
  var success = false;

  /* bool array unchanged used to ensure that during a breakMarriage
  function call started on man i only men >= i propose. 
  The boolean success is set true if breakMarriage to man i leads 
  to a new stable marriage solution, otherwise it is set false. 
  The integer array counter keeps a record of the proposals made 
  by the larger set. */

  for (let i = 1; i <= k; i++) {
    for (let j = 1; j <= n; j++) {
      choice[i][choicekn[i][j]] = j;
      choice[i][0] = n + 1;
      marriage[i] = 0;
    }
  }

  for (let i = 1; i <= n; i++) {
    counter[i] = 1;
    unchanged[i] = true;
  }

  var count = 0;
  for (let i = 1; i <= n; i++) {
    proposal(i, counter, marriage, count);
  }
  // the larger set have proposed and their optimal stable solution found
  // STABLE MARRIAGE()
  console.log(marriage);
  for (let i = 1; i <= n - 1; i++) {
    breakMarriage(counter, marriage, i, count);
  }
}

// allStableMatchings(
//   [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 5, 3, 7, 6, 1, 2, 8, 4],
//     [0, 8, 6, 3, 5, 7, 2, 1, 4],
//     [0, 1, 5, 6, 2, 4, 8, 7, 3],
//     [0, 8, 7, 3, 2, 4, 1, 5, 6],
//     [0, 6, 4, 7, 3, 8, 1, 2, 5],
//     [0, 2, 8, 5, 4, 6, 3, 7, 1],
//     [0, 7, 5, 2, 1, 8, 6, 4, 3],
//     [0, 7, 4, 1, 5, 2, 3, 6, 8],
//     [0, 2, 3, 8, 6, 4, 1, 5, 7],
//     [0, 8, 6, 3, 2, 1, 4, 7, 5],
//     [0, 6, 3, 5, 2, 7, 1, 8, 4]
//   ],
//   [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 5, 7, 1, 2, 6, 8, 4, 3, 9, 10, 11],
//     [0, 2, 3, 7, 5, 4, 1, 8, 6, 10, 11, 9],
//     [0, 8, 5, 1, 4, 6, 2, 3, 7, 11, 9, 10],
//     [0, 3, 2, 7, 4, 1, 6, 8, 9, 10, 5, 11],
//     [0, 7, 2, 5, 1, 11, 9, 3, 6, 10, 8, 4],
//     [0, 1, 6, 7, 5, 9, 11, 10, 8, 4, 2, 3],
//     [0, 2, 5, 7, 11, 10, 6, 9, 3, 4, 8, 1],
//     [0, 3, 8, 4, 5, 9, 7, 10, 2, 6, 11, 1]
//   ],
//   11,
//   8
// );
