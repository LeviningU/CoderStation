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

export function getIssueByIdApi(id) {
    return request({
        url: "/api/issue/" + id,
        method: "get"
    })
}

export function updateIssueApi(id, data) {
    return request({
        url: "/api/issue/" + id,
        method: "put",
        data
    })
}