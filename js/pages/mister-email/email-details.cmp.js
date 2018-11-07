import emailService from '../../services/mister-email/email.sevice.js'

export default {
    template: `
        <section class="page-content email-details" v-if="email">
            <button class="email-btn" @click="goBack">Go Back</button>
            <h1>{{email.subject}}</h1>
            <h3>From: {{email.sender}} , To: {{email.recipient}}</h3>
            <h4>cc: <span v-for="cc in email.cc">{{cc}}, </span></h4>
            <pre>{{email.message}}</pre>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);

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