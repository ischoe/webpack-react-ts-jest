import 'whatwg-fetch'

const baseApiUrl = 'http://localhost:3002/'

type Response = {
  status: number,
  json: () => any
}

export function get(endpoint: string) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(baseApiUrl + endpoint, options).then(onSuccess, onError)
}

function onSuccess(response: Response) {
  if(response.status === 200) {
      return response.json()
  } else {
      return false
  }
}

function onError(error: string) {
  console.log(error)
}
