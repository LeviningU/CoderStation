import request from './request';

export function getCaptcha() {
    return request({
        url: '/res/captcha',
        method: 'get'
    });
}

export function userIsExist(userId) {
    return request({
        url: '/api/user/userIsExist/' + userId,
        method: 'get'
    });
}

export function addUser(user) {
    return request({
        url: '/api/user',
        method: 'post',
        data: user
    });
}
