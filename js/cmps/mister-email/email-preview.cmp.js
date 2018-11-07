

export default {
    props: ['email'],
    template:`
        <section class="email-prev" @click="goToDetails">
            <h3>{{email.subject}}</h3>
            <h6 v-if="email.isMine">to {{email.recipient}}</h6>
            <h6 v-else>from {{email.sender}}</h6>
            <i title="Discard" class="email-btn fas fa-trash" @click.stop="$emit('rm')"></i>
            <!-- <button @click="$emit('rm')">x</button> -->
        </section>
        `,
        methods: {
            goToDetails() {
                this.$router.push(`/misteremail/${this.email.id}`);
                // console.log(this.email);
                            
            }
        }
}