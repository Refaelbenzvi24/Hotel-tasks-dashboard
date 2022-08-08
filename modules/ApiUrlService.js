export default class ApiUrlService {
    constructor(api) {
        this.apiRootUrl        = api.apiRootUrl
        this.apiCurrentVersion = api.apiCurrentVersion ?? ''
        this.apiFullRootUrl    = this.apiRootUrl + this.apiCurrentVersion
    }

    /**
     * build url params for a given object, can also join to an existing url params string
     * @param params
     * @param encodedUrlParameters
     */
    buildUrlParams(params, encodedUrlParameters) {
        if (Object.keys(params).length > 0) {
            const queryString = ApiUrlService.encodeQueryData(params)

            if (queryString) {
                if (encodedUrlParameters) {
                    return `${encodedUrlParameters}&${queryString}`
                }

                return `?${queryString}`
            }
        }
        if (encodedUrlParameters) {
            return encodedUrlParameters
        }
        return ''
    }

    /**
     * encode query data.
     * @private
     * @param data
     * @returns {string}
     */
    static encodeQueryData(data) {
        const query = []
        Object.keys(data).forEach((key) => {
            if (data[key] && key) {
                query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            }
        })
        return query.join('&')
    }
}
