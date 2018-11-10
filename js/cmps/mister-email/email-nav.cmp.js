import emailFilter from '../mister-email/email-filter.cmp.js';

export default {
    template: `
    <section class="email-list-nav">
        <nav>
            <button class="email-nav-btn" @click="composeEmail">compose</button>
        </nav>
        <email-filter></email-filter>
        <input type="text"
                class="search-email-input"
                v-model="filter.byTxt"
                @input.lazy="onChangeFilter"
                placeholder="search...">
    </section>
    `,
    data() {
        return {
            filter: {
                byTxt: '',
                byNew: true,
                isRead: 'all',
            }
        }
    },
    methods: {
        composeEmail() {
            this.$router.push('/misteremail/compose');            
        },
    },
    components: {
        emailFilter,
    }
}