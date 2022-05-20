import { logout } from './api/api.js'
import { clearUserData } from './api/util.js'
import { page } from './lib.js'
import { decorateCtx, updateNav } from './middlewares/middlewares.js'
import { catalogView } from './views/catalog.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'
import { registerView } from './views/register.js'
import { createView } from './views/create.js'
import { detailsView } from './views/details.js'
import { editView } from './views/edit.js'

updateNav()

page(decorateCtx)
page.redirect('/index.html', '/')
page('/', homeView)
page('/login', loginView)
page('/register', registerView)
page('/catalog', catalogView)
page('/create', createView)
page('/details/:id', detailsView)
page('/edit/:id', editView)
page.start()

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout()
    clearUserData()
    updateNav()
    page.redirect('/')   
})
