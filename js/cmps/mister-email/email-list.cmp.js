import emailPreview from '../../pages/mister-email/email-preview.cmp.js';
import emailService from '../../services/mister-email/email.sevice.js';
import eventBus, {EMAIL_CHANGE, CHANGE_EMAIL_FILTER, UPDATE_EMAIL} from '../../services/event-bus.service.js';

// import scrollBar from '../temp/vue-scrollbar.vue'

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
            emails: [],
            filter: {
                byTxt: '',
                byNew: true,
                isRead: 'all',
            }
        }
    },
    methods: {
        getEmails() {
            emailService.query(this.filter)
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
        this.getEmails();
        eventBus.$on(EMAIL_CHANGE, this.getEmails);
        eventBus.$on(CHANGE_EMAIL_FILTER,filter => {
            this.filter = filter;
            this.getEmails();
        })
        eventBus.$on(UPDATE_EMAIL, (email=>{
            emailService.saveEmail(email)
            .then(this.getEmails)
        }))
        
    },
    components: {
        emailPreview
    }
}