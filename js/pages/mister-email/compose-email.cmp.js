
export default {
    template: `
        <section class="page-content">
            <div class="flex">
                <button @click="sendEmail">Send</button>
            </div>
            <div class="flex flex-column">
                <label>
                    to: 
                    <input type="text">
                </label>
                <label>
                    subject: 
                    <input type="text">
                </label>
            </div>
            <textarea placeholder="Enter message here..."></textarea>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        sendEmail() {
            this.$router.push('/misteremail');
        }
    }
}