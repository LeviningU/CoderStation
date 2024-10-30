import request from "./request"

export function getInterviewApi() {
    return request({
        url: "/api/interview/interviewTitle",
        method: "get"
    })
}

export function getInterviewByIdApi(id) {
    return request({
        url: "/api/interview/" + id,
        method: "get"
    })
}