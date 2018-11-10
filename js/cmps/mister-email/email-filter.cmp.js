import eventBus, {CHANGE_EMAIL_FILTER, EMAIL_CHANGE} from '../../services/event-bus.service.js';
import emailService from '../../services/mister-email/email.sevice.js';

export default {
    template: `
    <section class="emails-filter">
        <div class="filter-radios">
            <label for="allRadio" :class="allClass">
                <span>All</span>
                <input name="filter-radio"
                       v-model="filter"
                       type="radio" 
                       id="allRadio" 
                       value="all">
            </label>
            
            <label for="readRadio" :class="readClass">
                <span>Read</span>
                <input name="filter-radio"
                       v-model="filter"
                       type="radio" 
                       id="readRadio" 
                       value=true>
            </label>

            <label for="unreadRadio" :class="unReadClass">
                <input name="filter-radio"  
                       v-model="filter"
                       type="radio" 
                       id="unreadRadio" 
                       value="">
                <span>UnRead ({{unReadCounter}})</span>
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            filter: 'all',
            unReadCounter: '0',
        }
    },
    created() {
        eventBus.$on(EMAIL_CHANGE,this.updateUnRead);
        this.updateUnRead();
    },
    methods: {
        updateUnRead() {
            emailService.getUnReadEmails().then(emails => this.unReadCounter = emails.length);
        }
    },
    computed: {
        allClass() {
            return {
                radioactive: this.filter === 'all'
            }
        },
        readClass() {
            return {
                radioactive: this.filter === 'true'
            }
        },
        unReadClass() {
            return {
                radioactive: this.filter === ''
            }
        },
    },
    watch: {
        filter() {            
            eventBus.$emit(CHANGE_EMAIL_FILTER, this.filter)
        }
    }
}