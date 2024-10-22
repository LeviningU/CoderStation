import request from "./request"

export function getIssueCommentByIdApi(id, params) {
    return request({
        url: "/api/comment/issuecomment/" + id,
        method: "get",
        params: {
            ...params
        }
    })
} 


export function getBookCommentByIdApi(id, params) {
    return request({
        url: "/api/comment/bookcomment/" + id,
        method: "get",
        params: {
            ...params
        }
    })
}

export function addCommentApi(data) {
    return request({
        url: "/api/comment",
        method: "post",
        data: {
            ...data
        }
    })
}