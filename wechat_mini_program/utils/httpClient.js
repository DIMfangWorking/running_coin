/**
 * http method
 * GET
 * POST
 * PUT
 * DELETE
 */
const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

/**
 * http client
 * supports interceptors: an array of interceptor functions
 */
class HttpClient {

  static getInstance() {
    if (this.hc) {
      return this.hc;
    } else {
      this.hc = new HttpClient();
      return this.hc;
    }
  }

  constructor() {

  }

  /**
   * header
   */
  headerPlaceholder = {};

  /**
   * url prefix
   */
  urlPrefixStr = '';


  /**
   * httpclient interceptor functions
   */
  interceptors = [];

  /**
   * intercept using interceptors
   */
  intercept(rsp) {
    return rsp;
    // this
    //   .interceptors
    //   .filter(f => typeof f === 'function')
    //   .every(f => f(rsp));
  }

  ////////////////////////////////////////////////////////////////
  req({ url, method, header, payload }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: (this.urlPrefixStr || '') + url,
        method: method || METHODS.GET,
        data: payload,
        header: {
          ...this.headerPlaceholder,
          ...header
        },
        success: res => this.intercept(res) && resolve(res),
        fail: reject
      })
    })
  }

  get(url, header, payload) {
    return this.req({ url, method: METHODS.GET, header, payload })
  }

  post(url, header, payload) {
    return this.req({ url, method: METHODS.POST, header, payload })
  }

  put(url, header, payload) {
    return this.req({ url, method: METHODS.PUT, header, payload })
  }

  delete(url, header, payload) {
    return this.req({ url, method: METHODS.DELETE, header, payload })
  }
  ///////////////////////////////////////////////////////////////////

  /**
   * builder functions
   */
  header(_header_) {
    this.header = _header_
    return this;
  }
  urlPrefix(_urlPrefix_) {
    this.urlPrefixStr = _urlPrefix_
    return this;
  }
  interceptor(_f_) {
    if (typeof _f_ === 'function') {
      this.interceptors.push(_f_)
    }
    return this;
  }
};

export { HttpClient, METHODS };