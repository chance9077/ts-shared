import client from './http'

/**
 * @template T
 * @typedef {{
 *   data: T | void
 *   result: {
 *     code: number
 *     msg:  string
 *   }
 * }} RawResponse
 */

/**
 * @template T
 * @typedef {Promise<RawResponse<T>>} U3Response
 */

/**
 * login
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password
 * @returns {U3Response<data>}
 */
export function login(data) {
  return client.post('/login', data)
}

/**
 * @template T
 * @typedef {import('./global').U3Response<T>} Response
 */

/**
 * logout
 * @returns {Response<void>}
 */
export function logout() {
  return client.post('/logout')
}