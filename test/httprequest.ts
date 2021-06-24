import { request, Agent, setGlobalDispatcher } from 'undici'
import querystring from 'qs'

setGlobalDispatcher(
  new Agent({
    keepAliveMaxTimeout: 10
  })
)

async function httpRequest(opts, context) {
  try {
    let url = opts.url
    const qs = querystring.stringify(opts.qs)
    if (qs) {
      url += '?' + qs
    }
    const res = await request(url, {
      method: opts.method.toUpperCase(),
      headers: opts.headers,
      body: opts.body
    })

    res.body.setEncoding('utf8')
    let body = ''
    for await (let chunk of res.body) {
      body += chunk
    }
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { httpRequest }
