import { classMap, html } from "../lib.js";

export const spinner = () => html`<p>Loading&hellip;</p>`

export const field = (label, name, type, value = '', placeholder = '', hasError) => {
    if (type == "textarea") {
        return html`<label class="ml">${label}: <textarea class=${classMap({error: hasError})} name=${name} placeholder=${placeholder} .value=${value}></textarea></label>`
    }else {
        return html`<label>${label}: <input class=${classMap({error: hasError})} type=${type} name=${name} .value=${value}></label>`
    }
}

export const errorMsg = (err) => {
    if (err) {
        return html`<p class="error">${err.message}</p>`
    }
    return null
}
  