const fs = require('fs');

function unsafeBufferUsage() {
  // ruleid: js-detect-new-buffer
  let buffer1 = new Buffer("Sensitive data");

  // ruleid: js-detect-new-buffer
  let buffer2 = new Buffer(16);

  // ruleid: js-detect-new-buffer
  let buffer3 = new Buffer([1, 2, 3, 4]);

  // ok: js-detect-new-buffer
  let buffer4 = Buffer.alloc(100);

  // ruleid: js-detect-new-buffer
  let buffer5 = Buffer.allocUnsafe(200);

  // ok: js-detect-new-buffer
  let buffer6 = Buffer.from("More sensitive data");

  // ok: js-detect-new-buffer
  let buffer7 = Buffer.from([5, 6, 7, 8]);

  function createBuffer(size) {
    // ruleid: js-detect-new-buffer
    return new Buffer(size);
  }

  function bufferFromUserInput(input) {
    // ruleid: js-detect-new-buffer
    return new Buffer(input);
  }

  fs.readFile('someFile.txt', (err, data) => {
    if (err) throw err;
    // ruleid: js-detect-new-buffer
    let buffer8 = new Buffer(data);
    console.log(buffer8.toString());
  });

  let obj = { length: 3 };
  //ok: js-detect-new-buffer
  let buffer9 = Buffer.from(obj);

  console.log("Buffers created");
}

unsafeBufferUsage();