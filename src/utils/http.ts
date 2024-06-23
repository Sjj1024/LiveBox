import { fetch } from '@tauri-apps/api/http'

const baseURL = `你的服务器地址`

const BODY_TYPE = {
    Form: 'Form',
    Json: 'Json',
    Text: 'Text',
    Bytes: 'Bytes',
}

const commonOptions = {
    timeout: 60,
}

const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL: string, relativeURL: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL
}

const buildFullPath = (baseURL: string, requestedURL: string) => {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL)
    }
    return requestedURL
}

const http = (url: string, options: any = {}) => {
    if (!options.headers) options.headers = {}
    if (options?.body) {
        if (options.body.type === BODY_TYPE.Form) {
            options.headers['Content-Type'] = 'multipart/form-data'
        }
    }

    options = { ...commonOptions, ...options }
    return fetch(buildFullPath(baseURL, url), options)
        .then((result: any) => {
            console.log('http success', result)
            const { status, data } = result
            if (status >= 200 && status < 400) {
                return { data }
            }
            return Promise.reject({ status, data })
        })
        .catch((err) => {
            console.error('http err:', err)
            return Promise.reject(err)
        })
}

export default http
