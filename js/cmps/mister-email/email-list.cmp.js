import emailPreview from './email-preview.cmp.js'
import emailService from '../../services/mister-email/email.sevice.js';
import eventBus, {EMAIL_CHANGE} from '../../services/event-bus.service.js';

export default {
    template: `
    <transition-group tag="ul" name="fade" class="email-list">
        <email-preview v-for="email in emails"
                       :email="email"
                       :key="email.id"
                       @rm="remove(email)"></email-preview>
    </transition-group>
    `,
    data() {
        return {
            emails: []
        }
    },
    methods: {
        getEmails() {
            emailService.query()
            .then((emails)=>{
                this.emails = emails;
            });
        },
        remove(email) {
            emailService.deleteEmail(email.id)
            .then(emails=> {
                this.emails = emails;
            });
        }
    },
    created() {
        this.getEmails()
        eventBus.$on(EMAIL_CHANGE, this.getEmails)

        
    },
    components: {
        emailPreview
    }
}