import emailList from '../../cmps/mister-email/email-list.cmp.js';
import emailNav from '../../cmps/mister-email/email-nav.cmp.js'
export default {
    template: `
    <section class="page-content mister-email">
        <section class="main-email">
        <email-nav></email-nav>
        <email-list></email-list>
        </section>
        <transition name="slideoutin" mode="out-in">
            <router-view></router-view>
        </transition>
        <button class="new-note-btn"
                @click="composeEmail"
                v-if="isInCompose">+</button>
    </section>
    `,
    methods: {
        composeEmail() {
            this.$router.push('/misteremail/compose');            
        }
    },
    computed: {
        isInCompose() {
            return !(this.$route.path.includes('compose')
                    ||!!this.$route.params.emailId);
        }
    },
    components: {
        emailList,
        emailNav
    }
}