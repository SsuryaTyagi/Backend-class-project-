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

// var createCounter = function (init) {
//   let num = init;
//   function increment() {
//     num = ++num;
//     return num;
//   }
//   function reset() {
//     num = init;
//     return num;
//   }
//   function decrement() {
//     num = --num;
//     return num;
//   }

//   return { increment, decrement, reset };
// };
// const counter = createCounter(5);

// console.log(counter.increment());

// console.log(counter.reset());
// console.log(counter.decrement());


// Example 1:

// Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
// Output: 65
// Explanation:
// Evaluating from right to left ...
// Starting with x = 4.
// 2 * (4) = 8
// (8) * (8) = 64
// (64) + 1 = 65
// Example 2:

// Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
// Output: 1000
// Explanation:
// Evaluating from right to left ...
// 10 * (1) = 10
// 10 * (10) = 100
// 10 * (100) = 1000
// Example 3:

// Input: functions = [], x = 42
// Output: 42
// Explanation:
// The composition of zero functions is the identity function
// var compose = function(functions) {
    
//     return function(x) {
//         functions.reverse().forEach((fn) => {
//             x = fn(x);
//         });
//         return x;
//     }
// };

//   const fn = compose([])
//   console.log(fn(4) );
  

var argumentsLength = function(...args) {
    return args.length;
};

 argumentsLength(1, 2, 3); // 3
