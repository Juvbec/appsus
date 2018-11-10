import eventBus, {CHANGE_EMAIL_FILTER} from '../../services/event-bus.service.js';

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
                <span>UnRead</span>
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            filter: 'all'
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
        }
    },
    watch: {
        filter() {
            console.log(this.filter);
            
            eventBus.$emit(CHANGE_EMAIL_FILTER, this.filter)
        }
    }
}