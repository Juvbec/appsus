import emailService from '../../services/mister-email/email.sevice.js';
import eventBus, {EMAIL_CHANGE} from '../../services/event-bus.service.js'
export default {
    template: `
        <section class="page-content compose-email">
            <div class="compose-func">
                <button @click="goBack">X</button>
                <button @click="sendEmail">Send ></button>
                <button @click="sendEmail">add attachment</button>
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
            <textarea v-model="email.message" placeholder="Enter message here..."></textarea>
        </section>
    `,
    data() {
        return {
            email: {
                recipient: '',
                cc: null,
                sender: 'Me',
                subject: null,
                message: null,
                isMine: true,
            }
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
            this.email.createdAt = Date.now();
            emailService.addEmail(this.email)
            .then(()=>{
                eventBus.$emit(EMAIL_CHANGE);
            })
            this.goBack();
        },
        goBack() {
            this.$router.push('/misteremail');
        }
    }
}