import eventBus, {DETAILED_VIEW} from '../../services/event-bus.service.js';


export default {
    props: ['email'],
    template:`
        <section v-if="email" class="email-prev" :class="isReadClasses" @click="goToDetails">
            <h3>{{email.subject}}</h3>
            <h6 v-if="email.isMine">to {{email.recipient}}</h6>
            <h6 v-else>from {{email.sender}}</h6>
            <i title="Discard" class="email-btn fas fa-trash" @click.stop="$emit('rm')"></i>
        </section>
        `,
        computed: {
            isReadClasses() {
                return {
                    notread: !this.email.isRead
                }
            }
        },
        methods: {
            goToDetails() {
                this.$router.push(`/misteremail/${this.email.id}`);
                eventBus.$emit(DETAILED_VIEW)                          
            }
        }
}