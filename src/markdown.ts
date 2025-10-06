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

// Paramètres
const template_path = Deno.env.get('TEMPLATE_PATH') || './template.html'
const entree = Deno.env.get('MARKDOWN_PATH') || '.'
const sortie = Deno.env.get('HTML_PATH') || './dist'
const url = Deno.env.get('BASE_URL')
const debug = Deno.env.has('DEBUG')
const template = await Deno.readTextFile(template_path)
const exclusions = [".git", ".vscode", "src", "dist", "assets", "old"]
const date = new Date().toLocaleDateString('fr-FR', { dateStyle: 'medium' })

const log = (...msg: string[]) => {
    if(debug) console.log(...msg)
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
        baseUrl: url ? url : undefined,
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

    log(`Lecture de ${ entree } pour génération`)

    for await (const entite of Deno.readDir(entree)) {
        const chemin = join(entree, entite.name)
        if(entite.isDirectory && !exclusions.includes(entite.name)) {
            dossiers.push(chemin)
            continue;
        }
        if(!entite.name.endsWith('.md')) {
            continue;
        }
        
        const extrait = await extraire(chemin)

        const arrivee = join(sortie, entree, entite.name.slice(0, -3) + '.html')
        const fichier = template
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
    await explorer(entree)
}

export default async () => {
    await explorer(entree)
}