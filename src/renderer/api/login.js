import service from '../utils/request'
export function login (data) {
  return service({
    url: '/operationSchedule/mainDoctorList',
    method: 'post',
    data
  })
}
