// Example 1: Using a variable to store the function
const crypto = require('crypto');
// ruleid: js-pseudo-random-bytes
const generateBytes = crypto.pseudoRandomBytes;
generateBytes(24, (err, buffer) => {
  console.log(buffer.toString('base64'));
});

// Example 2: Using bind
const crypto = require('crypto');
// ruleid: js-pseudo-random-bytes
const boundFunction = crypto.pseudoRandomBytes.bind(crypto);
boundFunction(32, (err, buffer) => {
  console.log(buffer.toString('hex'));
});

// Example 3: Using apply
const crypto = require('crypto');
// ruleid: js-pseudo-random-bytes
crypto.pseudoRandomBytes.apply(crypto, [16, (err, buffer) => {
  console.log(buffer.toString('hex'));
}]);

// Example 4: Using destructuring and renaming
// ruleid: js-pseudo-random-bytes
const { pseudoRandomBytes: generateRandomBytes } = require('crypto');
// ruleid: js-pseudo-random-bytes
generateRandomBytes(16, (err, buffer) => {
  console.log(buffer.toString('hex'));
});