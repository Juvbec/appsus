import emailService from '../../services/mister-email/email.sevice.js';
import utilService from '../../services/util.service.js'
import eventBus, {EMAIL_CHANGE} from '../../services/event-bus.service.js'
export default {
    template: `
        <section class="mister-email-content compose-email">
            <div class="compose-func flex space-between">
                <button @click="goBack">X</button>
                <button @click="sendEmail">Send ></button>
            </div>
            <div class="label-holder">
                <label>
                    <span>to:</span> 
                    <input type="text" :class="ValidityClasses" v-model="email.recipient">
                </label>
                <label v-if="email.recipient">
                    <span>Cc:</span> 
                    <input type="text" v-model="email.cc">
                </label>
                <label>
                    <span>subject:</span>  
                    <input type="text" v-model="email.subject">
                </label>
            </div>
            <textarea ref="emailMessage" v-model="email.message" placeholder="Enter message here..."></textarea>
        </section>
    `,
    data() {
        return {
            email: {
                recipient: '',
                cc: null,
                sender: 'Myself@fake.com',
                subject: '',
                message: null,
                isMine: true,
            }
        }
    },
    mounted() {
        if (this.$route.params.emailId) {
            this.createReplyTemplate();
            utilService.resetCursor(this.$refs.emailMessage);            
        }
    },
    computed: {
        ccs() {
            if (!this.email.cc) return null;
            return this.email.cc.split(',');
        },
        ValidityClasses() {
            return {
                'valid': this.checkValidity,
                'not-valid': !this.checkValidity
            }
        },
        checkValidity() {
            return emailService.verifyEmailAddress(this.email.recipient);
        }
    },
    methods: {
        sendEmail() {
            if (!this.checkValidity) return;
            this.email.cc = this.ccs;
            this.email.isRead = false;
            this.email.createdAt = Date.now();
            emailService.addEmail(this.email)
            .then(()=>{
                eventBus.$emit(EMAIL_CHANGE);
            })
            this.goBack();
        },
        goBack() {
            this.$router.push('/misteremail');
        },
        createReplyTemplate() {
            emailService.getById(this.$route.params.emailId).then(email => {
                console.log(email);
                this.email.recipient = email.recipient;
                this.email.subject = `RE:${email.subject}`;
                this.email.message = 
                `
                

> On ${moment(email.createdAt)} ${email.sender} sent: 
    "
    ${email.message}
    "
                `;
            });
        },
    }
}