import { logout } from './api/api.js'
import { clearUserData } from './api/util.js'
import { page } from './lib.js'
import { decorateCtx, updateNav } from './middlewares/middlewares.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'

updateNav()

page(decorateCtx)
page.redirect('/index.html', '/')
page('/', homeView)
page('/login', loginView)
page.start()

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout()
    clearUserData()
    updateNav()
    page.redirect('/')   
})