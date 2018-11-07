import emailPreview from './email-preview.cmp.js'
import emailService from '../../services/mister-email/email.sevice.js';

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
        insert() {
            var i = Math.round(Math.random() * this.emails.length)
            this.emails.splice(i, 0, id++)
        },
        remove(email) {
            var idx = this.emails.findIndex(currEmail=>currEmail.id===email.id)
            if (idx > -1) {
                this.emails.splice(idx, 1)
            }
        }
    },
    created() {
        this.getEmails()
    },
    components: {
        emailPreview
    }
}