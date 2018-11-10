import eventBus, {DETAILED_VIEW, EMAIL_CHANGE, EMAIL_TO_PLACE} from '../../services/event-bus.service.js';
import emailSevice from '../../services/mister-email/email.sevice.js';


export default {
    props: ['email'],
    template:`
        <section v-if="email" ref="container" class="email-prev" :class="isReadClasses" @click="goToDetails">
            <div ref="swipeDelete" class="swipe-delete">
                <i v-if="isSwipedForDelete" title="Discard" class="far fa-trash-alt" @touchstart.prevent.stop="deleteEmail"></i>
            </div>
            <div>
                <h3>{{email.subject}}</h3>
                <h5 v-if="email.isMine">to {{email.recipient}}</h5>
                <h5 v-else>from {{email.sender}}</h5>
            </div>
            <diV class="flex space-between">
                <h6 class="preview-time">{{createdAt}}</h6>
                <!-- <i title="Discard" class="email-btn fas fa-trash" @click.stop="$emit('rm')"></i> -->
            </diV>
        </section>
        `,
        data() {
            return {
                isSwipedForDelete: false,
            }
        },
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
            },
            deleteEmail() {
                emailSevice.deleteEmail(this.email.id)
                .then(() => {
                    eventBus.$emit(EMAIL_CHANGE);
                });
            },
            containerBackToPlace() {
                if (!this.$refs.container) return;
                this.$refs.container.style.transform = 'translateX(0)';
                this.$refs.swipeDelete.style.opacity = 0;
                this.isSwipedForDelete = false;
            },
            enableSwipeActions() {
                var hammer = new Hammer(this.$refs.container);
                hammer.on('swiperight', ev => {
                    this.$refs.container.style.transform = 'translateX(10%)'
                    this.$refs.swipeDelete.style.opacity = 1;
                    this.isSwipedForDelete = true;
                });
            },
        },
        mounted() {
            eventBus.$on(EMAIL_TO_PLACE, this.containerBackToPlace);
            if (window.outerWidth < 468) this.enableSwipeActions();
        }
}