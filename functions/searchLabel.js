const axios = require('axios')
const api = 'https://api.discogs.com/database/search'

exports.handler = async event => {
  const params = Object.entries({
    per_page: 10,
    q: event.queryStringParameters.query,
    token: process.env.API_TOKEN,
    type: 'label',
  })
    .map(p => p.join('='))
    .join('&')

  try {
    const response = await axios.get(`${api}?${params}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: response.data.results.map(result => ({
          id: result.id,
          img: result.thumb,
          link: result.uri,
          name: encodeURIComponent(result.title.replace(/\s\(\d+\)/, '')),
        })),
      }),
    }
  } catch (e) {
    return {
      body: JSON.stringify({
        error: e.response ? e.response.statusText : e.code,
      }),
      statusCode: e.response ? e.response.status : 400,
    }
  }
}
