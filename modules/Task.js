const defaultData = {
    title:         '',
    priority:      '',
    location:      '',
    department:    '',
    status:        '',
    details:       '',
    images:        [],
    hasAttachment: false,
}

export default class Task {
    constructor(data = defaultData) {
        this.id            = data.id
        this.title         = data.title
        this.priority      = data.priority
        this.department    = data.department
        this.location      = data.location
        this.status        = data.status
        this.details       = data.details
        this.images        = data.images ?? []
        this.hasAttachment = data.images?.length > 0
        this.pickedBy      = data.pickedBy
        this.createdAt     = data.createdAt
    }
}
