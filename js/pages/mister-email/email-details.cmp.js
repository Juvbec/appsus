import emailService from '../../services/mister-email/email.sevice.js'

export default {
    template: `
        <section class="page-content email-details" v-if="email">
            <h1>{{email.subject}}</h1>
            <pre>{{email.message}}</pre>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        let emailId =  this.$route.params.emailId;
        emailService.getById(emailId)
        .then(email=>{
            this.email = email;
            console.log(email);
            
        })
    }
}