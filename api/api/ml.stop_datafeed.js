// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlStopDatafeed (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.stop_datafeed](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-stop-datafeed.html) request
   *
   * @param {string} datafeed_id - The ID of the datafeed to stop
   * @param {boolean} allow_no_datafeeds - Whether to ignore if a wildcard expression matches no datafeeds. (This includes `_all` string or when no datafeeds have been specified)
   * @param {boolean} force - True if the datafeed should be forcefully stopped.
   * @param {time} timeout - Controls the time to wait until a datafeed has stopped. Default to 20 seconds
   */

  const acceptedQuerystring = [
    'allow_no_datafeeds',
    'force',
    'timeout'
  ]

  const snakeCase = {
    allowNoDatafeeds: 'allow_no_datafeeds'

  }

  return function mlStopDatafeed (params, options, callback) {
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
    if (params['datafeed_id'] == null && params['datafeedId'] == null) {
      const err = new ConfigurationError('Missing required parameter: datafeed_id or datafeedId')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, datafeedId, datafeed_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'datafeeds' + '/' + encodeURIComponent(datafeed_id || datafeedId) + '/' + '_stop'

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

module.exports = buildMlStopDatafeed
