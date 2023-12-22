import { uint8ToInt8, uint8ToInt16, uint8ToUint16, uint8ToInt32, uint8ToUint32, uint8ToFloat32, uint8ToFloat64, uint8ToBigInt64, uint8ToBigUint64 } from './utils/typecast.js';
import { decodeUtf8 } from './utils/decoder.js';

export class BinaryStream {
    buffer: ArrayBuffer;
    u8: Uint8Array;
    offset: number;
    remaining: number;

    constructor(buffer: ArrayBuffer, offset = 0) {
        if (offset < 0 || offset > buffer.byteLength)
            throw new Error('Cannot access buffer at out of bound offset.');

        this.buffer = buffer;
        this.u8 = new Uint8Array(buffer);
        this.offset = offset;
        this.remaining = buffer.byteLength;
    }

    /**
     * @deprecated This function is deprecated and will be removed in future. Use seek instead.
     */
    setOffset(offset: number): void {
        this.seek(offset);
    }

    /**
     * Set offset to given value.
     */
    seek(offset: number): void {
        if (offset < 0 || offset > this.buffer.byteLength)
            throw new Error('Cannot access buffer at out of bound offset.');

        this.offset = offset;
        this.remaining = this.buffer.byteLength - offset;
    }

    /**
     * Advance offset by given amount of bytes.
    */
    skip(bytes: number): void {
        if (bytes < 0 || this.remaining < bytes)
            throw new Error('Cannot access buffer at out of bound offset.');

        this.offset += bytes;
        this.remaining -= bytes;
    }

    /**
     * Read given amount of bytes and decode them as utf8 string. Returned value will be null-terminated.
    */
    readString(length: number): string {
        if (length < 0 || this.remaining < length)
            throw new Error('Cannot access buffer at out of bound offset.');

        let stringOffset = this.offset + length;
        for (let x = this.offset; x < stringOffset; x++)
            if (this.u8[x] === 0)
                stringOffset = x;

        const data = decodeUtf8(this.u8.subarray(this.offset, stringOffset));

        this.offset += length;
        this.remaining -= length;

        return data;
    }

    /**
     * Read one element as 8-bit integer.
    */
    readInt8(): number {
        if (this.remaining < 1)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToInt8(this.u8[this.offset]);

        this.offset += 1;
        this.remaining -= 1;

        return data;
    }

    /**
     * Read given amount of elements as array of 8-bit integers.
    */
    readInt8Array(length: number): Int8Array {
        if (length < 0 || this.remaining < length)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Int8Array(length);

        for (let x = 0; x < length; x++)
            data[x] = uint8ToInt8(this.u8[this.offset + x]);

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 8-bit unsigned integer.
    */
    readUint8(): number {
        if (this.remaining < 1)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = this.u8[this.offset];

        this.offset += 1;
        this.remaining -= 1;

        return data;
    }

    /**
     * Read given amount of elements as array of 8-bit unsigned integers.
    */
    readUint8Array(length: number): Uint8Array {
        if (length < 0 || this.remaining < length)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Uint8Array(length);

        for (let x = 0; x < length; x++)
            data[x] = this.u8[this.offset + x];

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 16-bit integer.
    */
    readInt16(): number {
        if (this.remaining < 2)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToInt16(this.u8[this.offset], this.u8[this.offset + 1]);

        this.offset += 2;
        this.remaining -= 2;

        return data;
    }

    /**
     * Read given amount of elements as array of 16-bit integers.
    */
    readInt16Array(length: number): Int16Array {
        if (length < 0 || this.remaining < length * 2)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Int16Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 2;
            data[x] = uint8ToInt16(this.u8[offset], this.u8[offset + 1]);
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 16-bit unsigned integer.
    */
    readUint16(): number {
        if (this.remaining < 2)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToUint16(this.u8[this.offset], this.u8[this.offset + 1]);

        this.offset += 2;
        this.remaining -= 2;

        return data;
    }

    /**
     * Read given amount of elements as array of 16-bit unsigned integers.
    */
    readUint16Array(length: number): Uint16Array {
        if (length < 0 || this.remaining < length * 2)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Uint16Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 2;
            data[x] = uint8ToUint16(this.u8[offset], this.u8[offset + 1]);
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 32-bit integer.
    */
    readInt32(): number {
        if (this.remaining < 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToInt32(this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3]);

        this.offset += 4;
        this.remaining -= 4;

        return data;
    }

    /**
     * Read given amount of elements as array of 32-bit integers.
    */
    readInt32Array(length: number): Int32Array {
        if (length < 0 || this.remaining < length * 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Int32Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 4;
            data[x] = uint8ToInt32(this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3]);
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 32-bit unsigned integer.
    */
    readUint32(): number {
        if (this.remaining < 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToUint32(this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3]);

        this.offset += 4;
        this.remaining -= 4;

        return data;
    }

    /**
     * Read given amount of elements as array of 32-bit unsigned integers.
    */
    readUint32Array(length: number): Uint32Array {
        if (length < 0 || this.remaining < length * 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Uint32Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 4;
            data[x] = uint8ToUint32(this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3]);
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 32-bit float.
    */
    readFloat32(): number {
        if (this.remaining < 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToFloat32(this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3]);

        this.offset += 4;
        this.remaining -= 4;

        return data;
    }

    /**
     * Read given amount of elements as array of 32-bit floats.
    */
    readFloat32Array(length: number): Float32Array {
        if (length < 0 || this.remaining < length * 4)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Float32Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 4;
            data[x] = uint8ToFloat32(this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3]);
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 64-bit float.
    */
    readFloat64(): number {
        if (this.remaining < 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToFloat64(
            this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3],
            this.u8[this.offset + 4], this.u8[this.offset + 5], this.u8[this.offset + 6], this.u8[this.offset + 7]
        );

        this.offset += 8;
        this.remaining -= 8;

        return data;
    }

    /**
     * Read given amount of elements as array of 64-bit floats.
    */
    readFloat64Array(length: number): Float64Array {
        if (length < 0 || this.remaining < length * 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new Float64Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 8;
            data[x] = uint8ToFloat64(
                this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3],
                this.u8[offset + 4], this.u8[offset + 5], this.u8[offset + 6], this.u8[offset + 7]
            );
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 64-bit integer.
    */
    readBigInt64(): bigint {
        if (this.remaining < 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToBigInt64(
            this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3],
            this.u8[this.offset + 4], this.u8[this.offset + 5], this.u8[this.offset + 6], this.u8[this.offset + 7]
        );

        this.offset += 8;
        this.remaining -= 8;

        return data;
    }

    /**
     * Read given amount of elements as array of 64-bit integers.
    */
    readBigInt64Array(length: number): BigInt64Array {
        if (length < 0 || this.remaining < length * 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new BigInt64Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 8;
            data[x] = uint8ToBigInt64(
                this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3],
                this.u8[offset + 4], this.u8[offset + 5], this.u8[offset + 6], this.u8[offset + 7]
            );
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }

    /**
     * Read one element as 64-bit unsigned integer.
    */
    readBigUint64(): bigint {
        if (this.remaining < 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = uint8ToBigUint64(
            this.u8[this.offset], this.u8[this.offset + 1], this.u8[this.offset + 2], this.u8[this.offset + 3],
            this.u8[this.offset + 4], this.u8[this.offset + 5], this.u8[this.offset + 6], this.u8[this.offset + 7]
        );

        this.offset += 8;
        this.remaining -= 8;

        return data;
    }

    /**
     * Read given amount of elements as array of 64-bit unsigned integers.
    */
    readBigUint64Array(length: number): BigUint64Array {
        if (length < 0 || this.remaining < length * 8)
            throw new Error('Cannot access buffer at out of bound offset.');

        const data = new BigUint64Array(length);

        for (let x = 0; x < length; x++) {
            const offset = this.offset + x * 8;
            data[x] = uint8ToBigUint64(
                this.u8[offset], this.u8[offset + 1], this.u8[offset + 2], this.u8[offset + 3],
                this.u8[offset + 4], this.u8[offset + 5], this.u8[offset + 6], this.u8[offset + 7]
            );
        }

        this.offset += data.byteLength;
        this.remaining -= data.byteLength;

        return data;
    }
}
