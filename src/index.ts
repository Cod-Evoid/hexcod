export class BinaryStream {
    static _decoder = new TextDecoder();

    _view: DataView;
    buffer: ArrayBuffer;
    offset: number;

    constructor(buffer: ArrayBuffer, offset = 0) {
        if (offset < 0 || offset > buffer.byteLength)
            throw new Error('Out of bound offset.');

        this._view = new DataView(buffer);
        this.buffer = buffer;
        this.offset = offset;
    }

    _slice(byteLength: number): ArrayBuffer {
        this.setOffset(this.offset + byteLength);
        return this.buffer.slice(this.offset - byteLength, this.offset);
    }

    setOffset(offset: number): void {
        if (offset < 0 || offset > this.buffer.byteLength)
            throw new Error('Out of bound offset.');

        this.offset = offset;
    }

    readString(length: number): string {
        const buffer = this._slice(length),
            text = BinaryStream._decoder.decode(buffer);

        return text.replace(/[^ -~]+/g, '');
    }

    readInt8(): number {
        this.setOffset(this.offset + 1);
        return this._view.getInt8(this.offset - 1);
    }

    readInt8Array(length: number): Int8Array {
        return new Int8Array(this._slice(length));
    }

    readUint8(): number {
        this.setOffset(this.offset + 1);
        return this._view.getUint8(this.offset - 1);
    }

    readUint8Array(length: number): Uint8Array {
        return new Uint8Array(this._slice(length));
    }

    readInt16(): number {
        this.setOffset(this.offset + 2);
        return this._view.getInt16(this.offset - 2, true);
    }

    readInt16Array(length: number): Int16Array {
        return new Int16Array(this._slice(length * 2));
    }

    readUint16(): number {
        this.setOffset(this.offset + 2);
        return this._view.getUint16(this.offset - 2, true);
    }

    readUint16Array(length: number): Uint16Array {
        return new Uint16Array(this._slice(length * 2));
    }

    readInt32(): number {
        this.setOffset(this.offset + 4);
        return this._view.getInt32(this.offset - 4, true);
    }

    readInt32Array(length: number): Int32Array {
        return new Int32Array(this._slice(length * 4));
    }

    readUint32(): number {
        this.setOffset(this.offset + 4);
        return this._view.getUint32(this.offset - 4, true);
    }

    readUint32Array(length: number): Uint32Array {
        return new Uint32Array(this._slice(length * 4));
    }

    readFloat32(): number {
        this.setOffset(this.offset + 4);
        return this._view.getFloat32(this.offset - 4, true);
    }

    readFloat32Array(length: number): Float32Array {
        return new Float32Array(this._slice(length * 4));
    }

    readFloat64(): number {
        this.setOffset(this.offset + 8);
        return this._view.getFloat64(this.offset - 8, true);
    }

    readFloat64Array(length: number): Float64Array {
        return new Float64Array(this._slice(length * 8));
    }

    readBigInt64(): bigint {
        this.setOffset(this.offset + 8);
        return this._view.getBigInt64(this.offset - 8, true);
    }

    readBigInt64Array(length: number): BigInt64Array {
        return new BigInt64Array(this._slice(length * 8));
    }

    readBigUint64(): bigint {
        this.setOffset(this.offset + 8);
        return this._view.getBigUint64(this.offset - 8, true);
    }

    readBigUint64Array(length: number): BigUint64Array {
        return new BigUint64Array(this._slice(length * 8));
    }
}
