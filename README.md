# Turso Libsql Embedded Replica Leak

What - When using embedded replicas, the memory leak booms and crashes app

## Steps to repro

1. rename the app from `"turso-leak"` to your own
2. `fly secrets set DB_URL=<YOUR_DB_URL>`
3. `fly secrets set AUTH_TOKEN=<YOUR_DB_AUTH_TOKEN>`
4. `fly deploy`
5. `fly scale count 1` (optional to see OOM faster)
6. Use a load test of your choice and hit the app url
7. Look at grafana logs of your app, see memory leak

## Load Test

I use Grafana's K6 for the load testing with this script:

```
import http from 'k6/http'

function scenario_1() {
  http.get('https://<YOUR_APP>.fly.dev')
}

```

## Not using embedded replicas

In page.tsx, comment out the top block and uncomment the bottom block, then `fly deploy`:

```
  // Sync client
  // client = createClient({
  //   url: 'file:///tmp/local.db',
  //   syncUrl: process.env.DB_URL!,
  //   authToken: process.env.AUTH_TOKEN
  // })
  // client.sync()
  // END Sync client

  // Remote client (comment above and uncomment below to use remote turso)
  client = createClient({
  url: process.env.DB_URL!,
    authToken: process.env.AUTH_TOKEN
  })
  // END
```
