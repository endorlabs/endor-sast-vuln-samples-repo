const buffer = Buffer.alloc(64);

let offset = 0;

// ruleid: js-buffer-noassert
console.log('UInt8:', buffer.readUInt8(offset, true));
// ruleid: js-buffer-noassert
console.log('UInt16LE:', buffer.readUInt16LE(offset, true));
// ruleid: js-buffer-noassert
console.log('UInt16BE:', buffer.readUInt16BE(offset, true));
// ruleid: js-buffer-noassert
console.log('UInt32LE:', buffer.readUInt32LE(offset, true));
// ruleid: js-buffer-noassert
console.log('UInt32BE:', buffer.readUInt32BE(offset, true));
// ruleid: js-buffer-noassert
console.log('Int8:', buffer.readInt8(offset, true));
// ruleid: js-buffer-noassert
console.log('Int16LE:', buffer.readInt16LE(offset, true));
// ruleid: js-buffer-noassert
console.log('Int16BE:', buffer.readInt16BE(offset, true));
// ruleid: js-buffer-noassert
console.log('Int32LE:', buffer.readInt32LE(offset, true));
// ruleid: js-buffer-noassert
console.log('Int32BE:', buffer.readInt32BE(offset, true));
// ruleid: js-buffer-noassert
console.log('FloatLE:', buffer.readFloatLE(offset, true));
// ruleid: js-buffer-noassert
console.log('FloatBE:', buffer.readFloatBE(offset, true));
// ruleid: js-buffer-noassert
console.log('DoubleLE:', buffer.readDoubleLE(offset, true));
// ruleid: js-buffer-noassert
console.log('DoubleBE:', buffer.readDoubleBE(offset, true));

offset = 0;
// ruleid: js-buffer-noassert
buffer.writeUInt8(255, offset, true);
// ruleid: js-buffer-noassert
buffer.writeUInt16LE(65535, offset, true);
// ruleid: js-buffer-noassert
buffer.writeUInt16BE(65535, offset, true);
// ruleid: js-buffer-noassert
buffer.writeUInt32LE(4294967295, offset, true);
// ruleid: js-buffer-noassert
buffer.writeUInt32BE(4294967295, offset, true);
// ruleid: js-buffer-noassert
buffer.writeInt8(-128, offset, true);
// ruleid: js-buffer-noassert
buffer.writeInt16LE(-32768, offset, true);
// ruleid: js-buffer-noassert
buffer.writeInt16BE(-32768, offset, true);
// ruleid: js-buffer-noassert
buffer.writeInt32LE(-2147483648, offset, true);
// ruleid: js-buffer-noassert
buffer.writeInt32BE(-2147483648, offset, true);
// ruleid: js-buffer-noassert
buffer.writeFloatLE(3.14, offset, true);
// ruleid: js-buffer-noassert
buffer.writeFloatBE(3.14, offset, true);
// ruleid: js-buffer-noassert
buffer.writeDoubleLE(3.14159265359, offset, true);
// ruleid: js-buffer-noassert
buffer.writeDoubleBE(3.14159265359, offset, true);

console.log('Buffer after writing:', buffer);