import homePage from './pages/home-page.cmp.js';
import missKeep from './pages/miss-keep.cmp.js';
import misterEmail from './pages/mister-email/mister-email.cmp.js';
import composeEmail from './pages/mister-email/compose-email.cmp.js';
import emailDetails from './pages/mister-email/email-details.cmp.js'

const routes = [
    {path: '/', component: homePage},
    {path: '/misskeep', component: missKeep},
    {path: '/misteremail', component: misterEmail},
    {path: '/misteremail/compose', component: composeEmail},
    {path: '/misteremail/:emailId', component: emailDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;