import request from "./request"

export function getBookByPageApi(params) {
    return request({
        url: "/api/book",
        method: "get",
        params
    })
}

export function getBookByIdApi(id) {
    return request({
        url: "/api/book/" + id,
        method: "get"
    })
}

export function updateBookApi(id, data) {
    return request({
        url: "/api/book/" + id,
        method: "put",
        data
    })
}