import request from "./request"

export function getTypeApi() {
    return request({
        url: "/api/type",
        method: "get"
    })
}