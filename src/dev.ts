import build from "./markdown.ts"
import handler from "./serve.ts"

const DEBOUNCE = 500 // ms
const EVENTS = [
    "create",
    "modify",
    "remove"
]
const PATHS = [
    './pro',
    './doc',
    './inf',
    './readme.md'
]

await build()
Deno.serve({
    port: 80
}, handler)

let last_update = Date.now()
for await (const event of Deno.watchFs(PATHS, { recursive: true })) {
    if(!EVENTS.includes(event.kind)) continue
    if(last_update + DEBOUNCE > Date.now()) continue
    last_update = Date.now()

    console.info('[DEV] doc rebuilt')
    await build()
}