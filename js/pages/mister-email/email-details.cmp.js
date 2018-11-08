import emailService from '../../services/mister-email/email.sevice.js'
import eventBus, {DETAILED_VIEW, UPDATE_EMAIL} from '../../services/event-bus.service.js';

export default {
    template: `
        <section class="mister-email-content email-details" v-if="email">
            <nav>
                <button class="email-btn" @click="goBack">Go Back</button>
            </nav>
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
        },
        loadEmail() {
            let emailId =  this.$route.params.emailId;
        return emailService.getById(emailId)
        .then(email=>{
            this.email = email;    
            this.email.isRead = true;
            eventBus.$emit(UPDATE_EMAIL, this.email)
        })
        }
    },
    created() {
        console.log('details created!');
        this.loadEmail()
        .then(()=> {
            eventBus.$on(DETAILED_VIEW, this.loadEmail)
        })
    },
    destroyed() {
        console.log('details destroyed');
        
    }
} 