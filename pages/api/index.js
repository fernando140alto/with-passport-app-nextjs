import isPlainObject from 'lodash/isPlainObject'
import isEmpty from 'lodash/isEmpty'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { normalize } from 'normalizr'
// import { getAuthHeaders, clearAuthCredentials } from '~utils/auth'

// Available HTTP request methods
/**
 * @enum {string}
 */
export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

const API_ENDPOINT = new URL('/api/v1', 'some base url')

/**
 * @param {import 'normalizr'.schema.Entity} [schema]
 * @returns {function} response handler
 */
function makeResponseHandlerForSchema(schema) {
  /**
   * @param {Response} response
   * @returns {Object} normalized response
   */
  return async (response) => {
    // handle Server Error
    if (response.status >= 500) {
      throw Error('The server responded with an error. Please try again later.')
    }

    // handle no content
    if (response.status === 204) {
      return {}
    }

    const text = await response.text()
    let rawJSON

    try {
      rawJSON = JSON.parse(text)
    } catch {
      // do nothing
    }

    // handle empty response
    const json = rawJSON ? camelizeKeys(rawJSON) : {}

    if (response.ok) {
      return schema ? normalize(json, schema) : json
    }

    if (response.status === 401) {
      // user is unauthorized, sign out
    //   await clearAuthCredentials()
    }

    throw json
  }
}

/**
 * Calls the API, returning a promise that resolves to a possibly serialized
 * (if schema is provided) response object.
 *
 * @param {string} pathname API endpoint pathname
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method HTTP method
 * @param {any} body
 * @param {Boolean} sendAuthHeaders
 * @param {import 'normalizr'.schema.Entity} [schema]
 *
 * @returns {Object}
 */
export async function callAPI(
  pathname,
  method = HttpMethods.GET,
  body = {},
  /* sendAuthHeaders = true, */
  schema
) {
  const authHeaders = /* sendAuthHeaders ? await getAuthHeaders() : */ {}
  const requestOptions = {
    method,
    headers: {
      Accept: 'application/json',
      ...authHeaders,
    },
    credentials: 'omit',
    body: undefined,
  }

  // Build full URL by prepending API server URL
  let url = new URL(pathname, API_ENDPOINT).toString()

  if (method === HttpMethods.GET) {
    if (!isEmpty(body)) {
      // React Native's URL does not implement search
      // this appends it "manually"
      const search = new URLSearchParams(body).toString()
      url = `${url}?${search}`
    }
  } else if (isPlainObject(body)) {
    requestOptions.body = JSON.stringify(decamelizeKeys(body))
    requestOptions.headers['Content-Type'] = 'application/json'
  } else {
    if (body instanceof FormData) {
      requestOptions.headers['Content-Type'] = 'multipart/form-data'
    }
    requestOptions.body = body
  }

  const handleResponse = makeResponseHandlerForSchema(schema)

  const response = await fetch(url, requestOptions)
  const result = await handleResponse(response)
  return result
}
