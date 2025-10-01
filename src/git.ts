// https://docs.github.com/fr/webhooks/using-webhooks/validating-webhook-deliveries#javascript-example
function hexToBytes(hex: string) {
    const len = hex.length / 2;
    const bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        const c = hex.slice(i, i + 2);
        bytes[index] = parseInt(c, 16);
        index += 1;
    }

    return bytes;
}

const encoder = new TextEncoder()
export async function verifySignature(secret: string, signatureHex: string, payload: string) {
    const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } }

    const keyBytes = encoder.encode(secret)
    const key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        false,
        [ "sign", "verify" ]
    )

    const signatureBytes = hexToBytes(signatureHex)
    const dataBytes = encoder.encode(payload)

    return await crypto.subtle.verify(
        algorithm.name,
        key,
        signatureBytes,
        dataBytes
    )
}

export const checkout = (signal?: AbortSignal) => {
    const fetch = new Deno.Command('git', {
        args: ['fetch', 'origin', 'production'],
        stderr: "inherit",
        stdout: "null",
        signal
    })
    const fetched = fetch.outputSync().success
    if(!fetched) return false

    const checkout = new Deno.Command('git', {
        args: ['checkout', 'production'],
        stderr: "inherit",
        stdout: "null",
        signal
    })
    const checked = checkout.outputSync().success
    if(!checked) return false

    const reset = new Deno.Command('git', {
        args: ['reset', '--hard', 'origin/production'],
        stderr: "inherit",
        stdout: "null",
        signal
    })
    const hasReset = reset.outputSync().success
    if(!hasReset) return false

    return true
}