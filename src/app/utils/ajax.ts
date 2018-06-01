class Storage {
    constructor(private storage) {
        this.storage = storage
    }
    get(key) {
        return this.storage.getItem(key)
    }
    set(key, value) {
        this.storage.setItem(key, value)
        return true
    }
    clear() {
        this.storage.clear()
    }
    remove(key) {
        this.storage.removeItem(key)
    }
}

export class Ajax {
    xhr = new XMLHttpRequest()
    constructor() {
    }
    get(path, data, async = true) {
        let query = '?' + Object.keys(data).reduce((a, k) => { a.push(k + '=' + encodeURIComponent(data[k])); return a }, []).join('&')
        if (query === '?') {
            query = ''
        }
        let that = this
        let xhr = that.xhr
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText)
                    let state = response.state
                    let msg = response.msg
                    let data = response.data
                    if (state === 200) {
                        that.success(data)
                    }
                    else if (state === 401 || state === 403) {
                        that.not_login()
                    } else if (state === 422) {
                        that.params_error(data)
                    } else if (state === 405) {
                        console.log('方法不支持')
                    } else if (state === 404) {
                        console.log('资源不存在')
                    }
                }
                else if (xhr.status >= 500) {
                    that.server_error()
                }
                else {
                }
            }
        };
        xhr.open('get', path + query, async);
        xhr.send()
    }
    post(path, data, async = true, override = '', content_type = 'application/json') {
        let that = this
        let xhr = this.xhr
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText)
                    let state = response.state
                    let msg = response.msg
                    let data = response.data
                    if (state === 200) {
                        that.success(data)
                    }
                    else if (state == 401 || state == 403) {
                        that.not_login()
                    } else if (state == 422) {
                        that.params_error(data)
                    } else if (state == 405) {
                        console.log('方法不支持')
                    } else if (state == 404) {
                        console.log('资源不存在')
                    }
                }
                else if (xhr.status >= 500) {
                    that.server_error()
                }
                else {
                }
            }
        };
        xhr.open('post', path, async);
        if (override !== '') {
            this.xhr.setRequestHeader('X-Method', override);
        }
        if (content_type !== '') {
            this.xhr.setRequestHeader('Content-Type', content_type);
        }
        xhr.send(JSON.stringify(data))
    }
    delete(path, data, async = true, content_type = 'application/json') {
        this.post(path, data, async, 'DELETE', content_type)
    }
    put(path, data, async = true, content_type = 'application/json') {
        this.post(path, data, async, 'PUT', content_type)
    }

    success(data) {
        console.log(data)
    }
    not_login() {
        console.log('not login')
    }
    server_error() {
        console.log('服务器发生错误')
    }
    params_error(errors) {
        let msg = ''
        for (let key in errors) {
            msg += errors[key] + ';'
        }
        console.log(msg)
    }
}

export const sessionstorage = new Storage(window.sessionStorage);
export const localstorage = new Storage(window.localStorage);


