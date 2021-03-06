import { getUserData } from "../api/util.js";
import { render } from "../lib.js";
import { notify } from "./notify.js";
const root = document.querySelector('main')

export function decorateCtx(ctx, next) {
    ctx.render = (template) => render(template, root)
    ctx.updateNav = updateNav
    ctx.notify = notify
    
    next()
}

export function updateNav() {
    if (getUserData()) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    }else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}
