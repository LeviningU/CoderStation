import request from "./request"

export function getBookByPageApi(params) {
    return request({
        url: "/api/book",
        method: "get",
        params
    })
}