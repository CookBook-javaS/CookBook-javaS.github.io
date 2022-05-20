import { page } from "../lib.js"
import { notify } from "../middlewares/notify.js"
import { clearUserData, getUserData, setUserData } from "./util.js"

const host = 'https://parseapi.back4app.com'

async function request(url, options) {
    try {
        const res = await fetch(host + url, options)

        if (!res.ok) {
            const problem = await res.json()
            //.error = Така се казва свойството за message на грешка в response на back4app!
            throw { 
                message: problem.error, 
                code: problem.code
            }
        }
        return res.json()
    } catch (err) {
        //alert(err.message)//това е свойството на грешката, което идва от try/catch конструкцията!
        if (err.code == 101) {// === ако се изисква да е логнат да не блокира страницата а да го прати до login!
            page.redirect('/login')
        }
        notify(err.message)
        throw err
    }
}
function createOptions(method = "get", data) {
    const options = {
        method,
        headers: {//така са само за конкретния application в back4app!
            "X-Parse-Application-Id": "G3FMDTwIIZMEx28kCD2n6a9mVtxdnlLntkFOTcaz",
            "X-Parse-REST-API-Key": "JWgCdmXpcrGHst1qBjQNDmGxx4HYRslYkrEpxVFo"
        }
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }
    
    const userData = getUserData()
    if (userData) {
        options.headers["X-Parse-Session-Token"] = userData.token
    }

    return options
}

export async function get(url) {
    return request(url, createOptions())
}
export async function post(url, data) {
    return request(url, createOptions('post', data))
}
export async function put(url, data) {
    return request(url, createOptions('put', data))
}
export async function del(url) {
    return request(url, createOptions('delete'))
}

export async function login(username, password) {
    const result = await post('/login', {username, password})

    const userData = {
        username,
        email: result.email,
        id: result.objectId,
        token: result.sessionToken
    }

    setUserData(userData)
}
export async function register(username, email, password) {
    const result = await post('/users', {username, email, password})

    const userData = {
        username,
        email,
        id: result.objectId,
        token: result.sessionToken
    }

    setUserData(userData)
}

export async function logout() {
    await post('/logout')
    /*тук го awaitваме и ако има грешка няма да се изпълни другата част, 
    за по-добър userExp е по-добре да го правим без await === каквото и да става ди и да има
    грешка пак изтрии sessionStorage!
Защото ппц като натиснеш logout винаги те изкарва от профила в който си, 
ама винаги а тук ако го awaitnem може някъде да изкочи грешка в заявката,
което на своя страна ще спре пренасочването и няма да ни позволи да се логаутнем!
    */
    clearUserData()

}
