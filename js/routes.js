import homePage from './pages/home-page.cmp.js'
// import missKeep from ''
// import misterEmail from ''

const routes = [
    {path: '/', component: homePage},
    // {path: '/misskeep', component: missKeep},
    // {path: '/misteremail', component: misterEmail},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;