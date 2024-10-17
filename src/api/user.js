import request from './request';

export function getCaptchaApi() {
    return request({
        url: '/res/captcha',
        method: 'get'
    });
}

export function userIsExistApi(userId) {
    return request({
        url: '/api/user/userIsExist/' + userId,
        method: 'get'
    });
}

export function addUserApi(user) {
    return request({
        url: '/api/user',
        method: 'post',
        data: user
    });
}

export function userLoginApi(user) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: user
    });
}

export function getUserByIdApi(userId) {
    return request({
        url: '/api/user/' + userId,
        method: 'get'
    });
}

export function getInfoApi() {
    return request({
        url: '/api/user/whoami',
        method: 'get'
    });
}

export function getScoreRankApi() {
    return request({
        url: '/api/user/pointsrank',
        method: 'get'
    });
}