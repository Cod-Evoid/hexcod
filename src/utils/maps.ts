import { uint8ToInt8, uint8ToInt16, uint8ToUint16, uint8ToInt32, uint8ToUint32, uint8ToFloat32, uint8ToFloat64, uint8ToBigInt64, uint8ToBigUint64 } from './typecast.js';

export type Source = ArrayBuffer | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export type DataType = 'i8' | 'u8' | 'i16' | 'u16' | 'i32' | 'u32' | 'f32' | 'f64' | 'i64' | 'u64';

export type PrimitiveValue<T extends DataType> =
    T extends 'i64' | 'u64' ? bigint
    : number;

export type TypedArray<T extends DataType> =
    T extends 'i64' ? BigInt64Array
    : T extends 'u64' ? BigUint64Array
    : T extends 'f64' ? Float64Array
    : T extends 'f32' ? Float32Array
    : T extends 'i32' ? Int32Array
    : T extends 'u32' ? Uint32Array
    : T extends 'i16' ? Int16Array
    : T extends 'u16' ? Uint16Array
    : T extends 'i8' ? Int8Array
    : Uint8Array;

export const TypedArrayMap = {
    i8: Int8Array,
    u8: Uint8Array,
    i16: Int16Array,
    u16: Uint16Array,
    i32: Int32Array,
    u32: Uint32Array,
    f32: Float32Array,
    f64: Float64Array,
    i64: BigInt64Array,
    u64: BigUint64Array,
};

export const TypecastMap = {
    i8: uint8ToInt8,
    u8: undefined,
    i16: uint8ToInt16,
    u16: uint8ToUint16,
    i32: uint8ToInt32,
    u32: uint8ToUint32,
    f32: uint8ToFloat32,
    f64: uint8ToFloat64,
    i64: uint8ToBigInt64,
    u64: uint8ToBigUint64,
};
