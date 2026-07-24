import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'

const serverDirectory = new URL('../dist/server/', import.meta.url)
const hostingDirectory = new URL('../dist/.openai/', import.meta.url)
const hostingSource = new URL('../.openai/hosting.json', import.meta.url)
const hostingTarget = new URL('../dist/.openai/hosting.json', import.meta.url)
const serverEntry = new URL('../dist/server/index.js', import.meta.url)

mkdirSync(serverDirectory, { recursive: true })
mkdirSync(hostingDirectory, { recursive: true })

if (existsSync(hostingSource)) {
  copyFileSync(hostingSource, hostingTarget)
}

writeFileSync(
  serverEntry,
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response

    const url = new URL(request.url)
    url.pathname = '/'
    return env.ASSETS.fetch(new Request(url, request))
  },
}
`,
)
