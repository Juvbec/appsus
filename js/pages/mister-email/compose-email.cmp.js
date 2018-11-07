
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
                    <input type="text" v-model="recipient">
                </label>
                <label v-if="recipient">
                    <span>Cc:</span> 
                    <input type="text">
                </label>
                <label>
                    <span>subject:</span>  
                    <input type="text">
                </label>
            </div>
            <textarea placeholder="Enter message here..."></textarea>
        </section>
    `,
    data() {
        return {
            recipient: null
        }
    },
    methods: {
        sendEmail() {
            this.goBack()
        },
        goBack() {
            this.$router.push('/misteremail');
        }
    }
}