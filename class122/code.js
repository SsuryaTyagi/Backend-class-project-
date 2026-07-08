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

// var argumentsLength = function(...args) {
//     return args.length;
// };

//  argumentsLength(1, 2, 3); // 3
// var reduce = function(nums, fn, init) {

//     let output = null
//     nums.forEach((num) => {
//         output = fn(output, num);
//     });
//     return output==null?init:output;
// };

// console.log(reduce([1, 2, 3, 4], function sum(accum, curr) { return accum + curr; }, 0) );

// var once = function (fn) {
//   let calls = 0;
//   if (calls >= 1) {
//     return undefined;
//   }
//   if (calls === 0) {
//     calls++;
//   }
//   return function (...args) {
//     let value = fn(...args);
//     return { "calls": calls, "value": value };
//   };
// };



// var once = function (fn) {
//   let calls = 0;

//   return function (...args) {
//     if (calls > 0) {
//       return undefined;
//     }
//     calls++;
//     let value = fn(...args);
//     return [{ "calls": calls, "value": value }];
//   };
// };

// let fn = (a, b, c) => a + b + c;
// let onceFn = once(fn);

// console.log(onceFn(1, 2, 3)); // 6
// console.log(onceFn(2, 3, 6)); // undefined


// var addTwoPromises = async function(promise1, promise2) {
//     const [value1, value2] = await Promise.all([promise1, promise2]);
//     return value1 + value2;
// };

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */



async function sleep(millis) {
    return await new Promise(resolve => setTimeout(resolve, millis));
}


  let t = Date.now()
  sleep(100).then(() => console.log(Date.now()-t)) // 100
