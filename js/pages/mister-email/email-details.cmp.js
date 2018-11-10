import emailService from '../../services/mister-email/email.sevice.js'
import eventBus, { DETAILED_VIEW, UPDATE_EMAIL, EMAIL_CHANGE } from '../../services/event-bus.service.js';

export default {
    template: `
        <section class="mister-email-content email-details" v-if="email">
            <nav>
                <button class="email-btn" @click="goBack">Go Back</button>
                <button class="email-btn" @click="onReply">Reply</button>
                <i class="email-btn fas fa-trash" @click="deleteEmail"></i>
            </nav>
            <div class="details-container">
                <h1>{{email.subject}}</h1>
                <h3>From: {{email.sender}}</h3>
                <h4>To: {{email.recipient}}</h4>
                <h4>cc: <span v-for="cc in email.cc">{{cc}}, </span></h4>
                <pre>{{email.message}}</pre>
            </div>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        goBack() {
            this.$router.push('/misteremail');
        },
        loadEmail() {
            let emailId = this.$route.params.emailId;
            return emailService.getById(emailId)
                .then(email => {
                    this.email = email;
                    this.email.isRead = true;
                    eventBus.$emit(UPDATE_EMAIL, this.email)
                })
        },
        onReply() {
            this.$router.push(`/misteremail/compose/${this.email.id}`);
        },
        deleteEmail() {
            emailService.deleteEmail(this.$route.params.emailId)
                .then(() => {
                    eventBus.$emit(EMAIL_CHANGE);
                    this.$router.push(`/misteremail`);
                })
        }
    },
    created() {
        console.log('details created!');
        this.loadEmail()
            .then(() => {
                eventBus.$on(DETAILED_VIEW, this.loadEmail)
            })
    },
    destroyed() {
        console.log('details destroyed');

    }
} 