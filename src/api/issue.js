import request from "./request"

export function getIssueByPageApi(params) {
    return request({
        url: "/api/issue/",
        method: "get",
        params
    })
}

export function addIssueApi(data) {
    return request({
        url: "/api/issue/",
        method: "post",
        data
    })
}