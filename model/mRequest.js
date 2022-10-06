
class Request {
    constructor(id, client_id, category, subject, created_at, ended_at, description, deadline, priority, commment, status) {
        this.id = id;
        this.client_id = client_id
        this.category = category
        this.subject = subject
        this.created_at = created_at;
        this.ended_at = ended_at;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.commment = commment;
        this.status = status;
    }
}

module.exports = Request;

