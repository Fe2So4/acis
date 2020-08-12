const config = require('@/config/urlConfig')

// 登录接口
export const login = `${config.default.api.baseURL}/acis/login`
// export const login = 'http://192.168.1.198:8090/acis/login'

// 修改密码
export const changePass = `${config.default.api.baseURL}/acis/userpermissions/synthesize/sysUpdateUserPwd`

// 获取当前登录信息
export const getUserInfo = `${config.default.api.baseURL}/acis/userpermissions/synthesize/SysDisplayUserInfo`

// 锁定系统
export const lockSystem = `${config.default.api.baseURL}/acis/userpermissions/synthesize/unlockAcisSystem`
