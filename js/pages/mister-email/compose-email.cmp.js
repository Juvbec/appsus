import emailService from '../../services/mister-email/email.sevice.js';

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
                    <input type="text" v-model="email.recipient">
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
                recipient: null,
                cc: null,
                sender: 'Me',
                subject: null,
                message: null,
                isMine: true
            }
        }
    },
    computed: {
        ccs() {
            if (!this.email.cc) return null;
            return this.email.cc.split(',');
        }
    },
    methods: {
        sendEmail() {
            this.email.cc = this.ccs;
            emailService.addEmail(this.email)
            this.goBack()
        },
        goBack() {
            this.$router.push('/misteremail');
        }
    }
}