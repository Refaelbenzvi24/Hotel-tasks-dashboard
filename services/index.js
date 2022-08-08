import TaskEndpoint from "./Task";
import Department from "./Department";

const apiData = {
    apiRootUrl:        'http://localhost:3000/',
    apiCurrentVersion: 'v1',
}

export const taskEndpoint = new TaskEndpoint(apiData)
export const departmentEndpoint = new Department(apiData)
