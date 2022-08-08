import ApiUrlService from "../../modules/ApiUrlService";

export default class Department extends ApiUrlService {
    endpoint = `${this.apiFullRootUrl}/department`

    async list() {
        try {
            const {data} = await http.get(this.endpoint)
            return data
        } catch (error) {
            throw error
        }
    }
}
