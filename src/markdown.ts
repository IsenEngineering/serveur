import { render } from "@deno/gfm"
// Le code en surbrillance dans ```...```
import "prism-bash.js"
import "prism-c.js"
import "prism-css.js"
import "prism-docker.js"
import "prism-typescript.js"
import "prism-json.js"

import { join } from "@std/path/join"
import { exists } from "@std/fs/exists"

interface Option {
    entree: string,
    sortie: string,
    url?: string,
    debug: boolean,
    template: string,
    exclusions: string[],
}

// Paramètres
const options: Option = {
    template: await Deno.readTextFile(Deno.env.get('TEMPLATE_PATH') || './template.html'),
    entree: Deno.env.get('MARKDOWN_PATH') || '.',
    sortie: Deno.env.get('HTML_PATH') || './dist',
    url: Deno.env.get('BASE_URL'),
    debug: Deno.env.has('DEBUG'),
    exclusions: [".git", ".vscode", "src", "dist", "assets", "old"],
}


const log = (...msg: string[]) => {
    if(options.debug) console.log(...msg)
}

const ecriture = async (chemin: string, fichier: string) => {
    const dossier = chemin.split('/').slice(0, -1).join('/')
    if(!await exists(dossier, { isDirectory: true })) {
        await Deno.mkdir(dossier, {
            recursive: true
        })
    }

    await Deno.writeTextFile(chemin, fichier, {
        create: true
    })
}

const extraire = async (path: string) => {
    if(!path.endsWith('.md')){
        throw `Le fichier doit être du markdown!`
    }

    const file = await Deno.readTextFile(path)

    const html = render(file, {
        baseUrl: options.url ? options.url : undefined,
    })
    const titre = path.split('/').at(-1)?.slice(0, -3) || '?' // on retire .md

    log(` - génération de ${ titre }.html depuis ${ titre }.md`)

    return {
        html,
        titre,
    }
}

const explorer = async (entree: string) => {
    const dossiers: string[] = []
    const date = new Date().toLocaleDateString('fr-FR', { dateStyle: 'medium' })

    log(`Lecture de ${ entree } pour génération`)

    for await (const entite of Deno.readDir(entree)) {
        const chemin = join(entree, entite.name)
        if(entite.isDirectory && !options.exclusions.includes(entite.name)) {
            dossiers.push(chemin)
            continue;
        }
        if(!entite.name.endsWith('.md')) {
            continue;
        }
        
        const extrait = await extraire(chemin)

        const arrivee = join(options.sortie, entree, entite.name.slice(0, -3) + '.html')
        const fichier = options.template
            .replace('{titre}', extrait.titre)
            .replace('{date}', date)
            .replace('{body}', extrait.html)
            .replaceAll('.md"', '.html"')
        
        await ecriture(arrivee, fichier)
    }

    // plus bas pour préserver l'ordre de génération (fichier puis sous-dossier)
    for(const dossier of dossiers) {
        await explorer(dossier)
    }
}

if(import.meta.main) {
    await explorer(options.entree)
}

export default async (opt?: Partial<Option>) => {
    for(const key in opt) {
        // @ts-ignore ts can't follow, or can't i?
        options[key] = opt[key]
    }

    await explorer(options.entree)
}