export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'))
}
export function setUserData(userData) {
    return sessionStorage.setItem('userData', JSON.stringify(userData))
}
export function clearUserData() {
    return sessionStorage.removeItem('userData')
}
export function parseQuery(queryString) {
    if (queryString == '') {
        return {}
    }else {
        const queries = queryString.split('&')
        .map(q => q.split("="))
        .reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {})

        return queries
    }
  
}

