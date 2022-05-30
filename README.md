Set of utilities to simplify work with array buffers.

## Installation

This package is hosted on GitHub Packages, so you need to configure npm to use correct [registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package). Then install package via npm.

```
npm install @cod-evoid/hexcod
```

## Usage

```typescript
import { BinaryStream } from '@cod-evoid/hexcod';

// Create an array buffer or use already existing one
const buffer = new ArrayBuffer(20),
    stream = new BinaryStream(buffer);

// Use one of available methods to read data however you want
stream.readUint32();

while (stream.offset < stream.buffer.byteLength)
    stream.readInt16Array(4);
```

## API

### Properties

```typescript
// It is advised to not mutate any of those properties by hand.

// An ArrayBuffer to work on.
buffer: ArrayBuffer

// Buffer's offset.
offset: number
```

### Methods

```typescript
// Creates new instance for given `buffer` and `offset`.
constructor(buffer: ArrayBuffer, offset = 0)

// Sets offset to new value.
setOffset(offset: number): void

// Reads one element as specific type.
readInt8(): number
readUint8(): number
readInt16(): number
readUint16(): number
readInt32(): number
readUint32(): number
readFloat32(): number
readFloat64(): number
readBigInt64(): bigint
readBigUint64(): bigint

// Reads multiple elements as specific type.
readInt8Array(length: number): Int8Array
readUint8Array(length: number): Uint8Array
readInt16Array(length: number): Int16Array
readUint16Array(length: number): Uint16Array
readInt32Array(length: number): Int32Array
readUint32Array(length: number): Uint32Array
readFloat32Array(length: number): Float32Array
readFloat64Array(length: number): Float64Array
readBigInt64Array(length: number): BigInt64Array
readBigUint64Array(length: number): BigUint64Array

// Reads multiple elements and decode them as string.
readString(length: number): string
```
