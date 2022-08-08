import {createServer} from "miragejs";
import tasks from "./data/tasks";
import departments from "./data/departments";
import uuid from "react-native-uuid";

createServer({
    urlPrefix: "http://localhost:3000/v1",
    routes() {
        this.get("/task", (schema, request) => {
            const {filter} = request.queryParams

            if (filter && filter !== 'all') {
                return tasks.filter(task => task.status === filter)
            }

            return tasks
        })

        this.get("/task/:id", (schema, request) => {
            const {id} = request.params
            return tasks.find(task => task.id === id)
        })

        this.patch("/task/pick/:id", (schema, request) => {
            const {id}    = request.params
            const task    = tasks.find(task => task.id === id)
            task.status   = 'In Progress'
            task.pickedBy = 'Current User'
            return task
        })

        this.patch("/task/close/:id", (schema, request) => {
            const {id}  = request.params
            const task  = tasks.find(task => task.id === id)
            task.status = 'Completed'
            return task
        })

        this.post("/task", (schema, request) => {
            const task = JSON.parse(request.requestBody)
            tasks.push({
                ...task,
                id: uuid.v4(),
                createdAt: Date.now()
            })
            return task
        })

        this.get("department", () => departments)
    }
})
