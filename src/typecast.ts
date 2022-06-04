const buffer = new ArrayBuffer(8),
    i8 = new Int8Array(buffer),
    u8 = new Uint8Array(buffer),
    i16 = new Int16Array(buffer),
    u16 = new Uint16Array(buffer),
    i32 = new Int32Array(buffer),
    u32 = new Uint32Array(buffer),
    f32 = new Float32Array(buffer),
    f64 = new Float64Array(buffer),
    i64 = new BigInt64Array(buffer),
    u64 = new BigUint64Array(buffer);

export function uint8ToInt8(a: number): number {
    u8[0] = a;

    return i8[0];
}

export function uint8ToInt16(a: number, b: number): number {
    u8[0] = a;
    u8[1] = b;

    return i16[0];
}

export function uint8ToUint16(a: number, b: number): number {
    u8[0] = a;
    u8[1] = b;

    return u16[0];
}

export function uint8ToInt32(a: number, b: number, c: number, d: number): number {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;

    return i32[0];
}

export function uint8ToUint32(a: number, b: number, c: number, d: number): number {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;

    return u32[0];
}

export function uint8ToFloat32(a: number, b: number, c: number, d: number): number {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;

    return f32[0];
}

export function uint8ToFloat64(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;
    u8[4] = e;
    u8[5] = f;
    u8[6] = g;
    u8[7] = h;

    return f64[0];
}

export function uint8ToBigInt64(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): bigint {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;
    u8[4] = e;
    u8[5] = f;
    u8[6] = g;
    u8[7] = h;

    return i64[0];
}

export function uint8ToBigUint64(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): bigint {
    u8[0] = a;
    u8[1] = b;
    u8[2] = c;
    u8[3] = d;
    u8[4] = e;
    u8[5] = f;
    u8[6] = g;
    u8[7] = h;

    return u64[0];
}
