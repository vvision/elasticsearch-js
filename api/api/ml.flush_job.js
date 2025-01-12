// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlFlushJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.flush_job](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-flush-job.html) request
   *
   * @param {string} job_id - The name of the job to flush
   * @param {boolean} calc_interim - Calculates interim results for the most recent bucket or all buckets within the latency period
   * @param {string} start - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} end - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} advance_time - Advances time to the given value generating results and updating the model for the advanced interval
   * @param {string} skip_time - Skips time to the given value without generating results or updating the model for the skipped interval
   * @param {object} body - Flush parameters
   */

  const acceptedQuerystring = [
    'calc_interim',
    'start',
    'end',
    'advance_time',
    'skip_time'
  ]

  const snakeCase = {
    calcInterim: 'calc_interim',
    advanceTime: 'advance_time',
    skipTime: 'skip_time'
  }

  return function mlFlushJob (params, options, callback) {
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
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_flush'

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

module.exports = buildMlFlushJob
