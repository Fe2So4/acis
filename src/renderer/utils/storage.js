const ptId = 'CURRENT_PTID'
const token = 'ACIS_URSER_TOKEN'
const account = 'ACIS_CURRENT_ACCOUNT'

export function setStoragePtId (val) {
  return localStorage.setItem(ptId, val)
}

export function getStoragePtId () {
  return localStorage.getItem(ptId)
}

export function removeStorage (name) {
  return localStorage.removeItem(name)
}

export function clearStorage () {
  return localStorage.clear()
}

export function setUserToken (val) {
  return localStorage.setItem(token, val)
}

export function getUserToken () {
  return localStorage.getItem(token)
}

export function removeUserToken () {
  return localStorage.removeItem(token)
}

export function setCurrentAccount (val) {
  return localStorage.setItem(account, val)
}

export function getCurrentAccount (val) {
  return localStorage.getItem(account, val)
}
