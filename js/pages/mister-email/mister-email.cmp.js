import emailList from '../../cmps/mister-email/email-list.cmp.js';
import emailNav from '../../cmps/mister-email/email-nav.cmp.js'
export default {
    template: `
    <section class="page-content mister-email">
        <section class="main-email">
        <email-nav></email-nav>
        <email-list></email-list>
        </section>
        <transition name="slideoutin" mode="out-in">
            <router-view></router-view>
        </transition>
        <button class="compose-btn" @click="composeEmail">+</button>
    </section>
    `,
    methods: {
        composeEmail() {
            this.$router.push('/misteremail/compose');            
        }
    },
    components: {
        emailList,
        emailNav
    }
}