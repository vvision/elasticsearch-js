// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildWatcherPutWatch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [watcher.put_watch](http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-put-watch.html) request
   *
   * @param {string} id - Watch ID
   * @param {boolean} active - Specify whether the watch is in/active by default
   * @param {number} version - Explicit version number for concurrency control
   * @param {number} if_seq_no - only update the watch if the last operation that has changed the watch has the specified sequence number
   * @param {number} if_primary_term - only update the watch if the last operation that has changed the watch has the specified primary term
   * @param {object} body - The watch
   */

  const acceptedQuerystring = [
    'active',
    'version',
    'if_seq_no',
    'if_primary_term'
  ]

  const snakeCase = {
    ifSeqNo: 'if_seq_no',
    ifPrimaryTerm: 'if_primary_term'
  }

  return function watcherPutWatch (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // check required parameters
    if (params['id'] == null) {
      const err = new ConfigurationError('Missing required parameter: id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'PUT'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_watcher' + '/' + 'watch' + '/' + encodeURIComponent(id)

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildWatcherPutWatch
