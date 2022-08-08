import ApiUrlService from "../../modules/ApiUrlService";

export default class TaskEndpoint extends ApiUrlService {
    endpoint = `${this.apiFullRootUrl}/task`

    async get(id) {
        try {
            const {data} = await http.get(`${this.endpoint}/${id}`);
            return data
        } catch (error) {
            throw error
        }
    }

    async list(filter) {
        try {
            const query  = this.buildUrlParams({filter})
            const {data} = await http.get(`${this.endpoint}${query}`);
            return data
        } catch (error) {
            throw error
        }
    }

    async create(task) {
        try {
            const {data} = await http.post(this.endpoint, task);
            return data
        } catch (error) {
            throw error
        }
    }

    async pick(id) {
        try {
            const {data} = await http.patch(`${this.endpoint}/pick/${id}`);
            return data
        } catch (error) {
            throw error
        }
    }

    async close(id) {
        try {
            const {data} = await http.patch(`${this.endpoint}/close/${id}`);
            return data
        } catch (error) {
            throw error
        }
    }
}
