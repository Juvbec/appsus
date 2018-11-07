import emailList from '../cmps/mister-email/email-list.cmp.js';

export default {
    template: `
    <section class="page-content">
    <button class="compose-btn" @click="newNote">+</button>
        <email-list></email-list>
    </section>
    `,
    components: {
        emailList
    }
}