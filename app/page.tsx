
import { headers } from 'next/headers'
import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

if (!client) {
  client = createClient({
    url: 'file:///tmp/local.db',
    syncUrl: process.env.DB_URL,
    authToken: process.env.AUTH_TOKEN
  })

  client.sync()
}

export default async function Home() {

  const r = await client?.execute("SELECT 1;")
  const host = headers().get('host')

  return (
    <main>
      <h1>{host}</h1>
      Hi, SELECT 1 = {JSON.stringify(r)}
    </main>
  )
}
