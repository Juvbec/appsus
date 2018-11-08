import emailList from '../../cmps/mister-email/email-list.cmp.js';

export default {
    template: `
    <section class="page-content mister-email">
        <section class="main-email">
        <nav></nav>
        <email-list></email-list>
        </section>

        <router-view></router-view>
        <button class="compose-btn" @click="composeEmail">+</button>
    </section>
    `,
    methods: {
        composeEmail() {
            this.$router.push('/misteremail/compose');            
        }
    },
    components: {
        emailList
    }
}