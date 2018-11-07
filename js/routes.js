import homePage from './pages/home-page.cmp.js';
import missKeep from './pages/miss-keep.cmp.js';
import misterEmail from './pages/mister-email/mister-email.cmp.js';
import composeEmail from './pages/mister-email/compose-email.cmp.js';
// import misterEmail from ''

const routes = [
    {path: '/', component: homePage},
    {path: '/misskeep', component: missKeep},
    {path: '/misteremail', component: misterEmail},
    {path: '/misteremail/compose', component: composeEmail},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;