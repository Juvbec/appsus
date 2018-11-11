import router from './routes.js';
// import userMsg from './cmps/user-msg.js';


new Vue({
    el: '#app',
    router,
    components: {
        // userMsg
    },
    data: {
        transitionName: "slideright"
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        openHamburgerMenu() {
            this.$refs.hamburger.classList.toggle('open');
        },
        goToMissKeep() {
            this.$router.push('/misskeep');
        },
        goToMisterEmail() {
            this.$router.push('/misteremail');
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //         const toDepth = to.path.split('/').length;
    //         const fromDepth = from.path.split('/').length;
    //         this.transitionName = toDepth < fromDepth ? 'slideright' : 'slideleft';
    //         next();
    // }
});