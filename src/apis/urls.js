const prefix = "/v1"

export default {
    login: prefix + '/system/admin/login',
    userInfo: prefix + '/system/admin/info',
    modify: id => `${prefix}/system/admin/user/${id}`,
}