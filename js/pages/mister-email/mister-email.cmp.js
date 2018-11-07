import emailList from '../../cmps/mister-email/email-list.cmp.js';

export default {
    template: `
    <section class="page-content">
        <email-list></email-list>
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