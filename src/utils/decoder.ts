const decoder = new TextDecoder();

export function decodeUtf8(buffer: ArrayBuffer): string {
    return decoder.decode(buffer);
}
