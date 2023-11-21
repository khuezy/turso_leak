
import { headers } from 'next/headers'
import { createClient, type Client } from '@libsql/client'

export const dynamic = 'force-dynamic'

let client: Client | null = null

if (!client && process.env.DB_URL) {

  // Sync client
  client = createClient({
    url: 'file:///tmp/local.db',
    syncUrl: process.env.DB_URL!,
    authToken: process.env.AUTH_TOKEN
  })
  client.sync()
  // END Sync client

  // Remote client (comment above and uncomment below to use remote turso)
  // client = createClient({
  //   url: process.env.DB_URL!,
  //   authToken: process.env.AUTH_TOKEN
  // })
  // END
}

export default async function Home() {
  const host = headers().get('host')

  // For simplicity sake, a simple SELECT 1; statement
  const r = await client?.execute("SELECT 1;")

  return (
    <main>
      <h1>{host}</h1>
      Hi, SELECT 1 = {JSON.stringify(r)}
    </main>
  )
}
