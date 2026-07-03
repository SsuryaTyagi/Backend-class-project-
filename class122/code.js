// /**
//  * @param {string} val
//  * @return {Object}
//  */
// var expect = function (val) {
//   function toBe(num) {
//     if (val === num) {
//       return { value: true };
//     } else {
//       return {"error": "Not Equal"}
//     }
//   }
//   function notToBe(num) {
//     if (val === num) {
//       return {"error": "Not Equal"}
//     } else {
//       return { value: true };
//     }
//   }
//   return { toBe, notToBe };
// };

// console.log( expect(5).toBe(5));
//  // true
//  expect(5).notToBe(5); // throws "Equal"

var createCounter = function (init) {
  let num = init;
  function increment() {
    num = ++num;
    return num;
  }
  function reset() {
    num = init;
    return num;
  }
  function decrement() {
    num = --num;
    return num;
  }

  return { increment, decrement, reset };
};
const counter = createCounter(5);

console.log(counter.increment());

console.log(counter.reset());
console.log(counter.decrement());
