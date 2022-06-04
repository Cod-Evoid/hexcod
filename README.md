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

while (stream.remaining > 0)
    stream.readInt16Array(4);
```
