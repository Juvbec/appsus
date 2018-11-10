import eventBus, {DETAILED_VIEW} from '../../services/event-bus.service.js';


export default {
    props: ['email'],
    template:`
        <section v-if="email" class="email-prev" :class="isReadClasses" @click="goToDetails">
            <div>
                <h3>{{email.subject}}</h3>
                <h5 v-if="email.isMine">to {{email.recipient}}</h5>
                <h5 v-else>from {{email.sender}}</h5>
            </div>
            <diV class="flex space-between">
                <h6 class="preview-time">{{createdAt}}</h6>
                <i title="Discard" class="email-btn fas fa-trash" @click.stop="$emit('rm')"></i>
            </diV>
        </section>
        `,
        computed: {
            isReadClasses() {
                return {
                    notread: !this.email.isRead
                }
            },
            createdAt() {
                return moment(this.email.createdAt).format('MMMM Do YYYY, h:mm');
            }
        },
        methods: {
            goToDetails() {
                this.$router.push(`/misteremail/${this.email.id}`);
                eventBus.$emit(DETAILED_VIEW)                          
            }
        }
}