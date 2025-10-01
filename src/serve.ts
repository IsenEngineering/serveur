import { serveDir } from "@std/http/file-server"
import { verifySignature, checkout } from "./git.ts"
import build from "./md.ts"

const port = Deno.env.get('PORT')
const GITHUB_WEBHOOK = Deno.env.get('GITHUB_WEBHOOK')

Deno.serve({
    port: port ? parseInt(port) : 80,
    hostname: '0.0.0.0'
}, async (req) => {
    const url = new URL(req.url)

    if(url.pathname.startsWith('/assets')) {
        return serveDir(req, {
            fsRoot: './assets',
            urlRoot: 'assets',
            headers: [
                'Cache-Control: max-age=14400'
            ]
        })
    }

    switch(url.pathname) {
        case '/': {
            const readme = new URL('/readme.html', url)
            return Response.redirect(readme)
        }
        case '/github': {
            if(!GITHUB_WEBHOOK) {
                return new Response('GITHUB_WEBHOOK missing', {
                    status: 500
                })
            }
            const body = await req.json()
            
            const event = req.headers.get('X-Github-Event')
            if(event !== 'push' || body.ref !== 'refs/heads/production') 
                return new Response(null, { status: 417 })
                
            const signature = req.headers.get('X-Hub-Signature-256')?.split('=').at(1)
            if(!signature || !(await verifySignature(GITHUB_WEBHOOK, signature, JSON.stringify(body)))) {
                return new Response(null, { status: 401 })
            }

            console.log(`Mise à jour demandé (${ body.pusher.name })`)

            const success = checkout(req.signal)

            await build()

            return success
                ? new Response(null, { status: 200 })
                : new Response('Une erreur est parvenue', { status: 500 })
        }
    }

    return serveDir(req, {
        fsRoot: './dist',
        headers: [
            'Cache-Control: max-age=14400'
        ]
    })
})