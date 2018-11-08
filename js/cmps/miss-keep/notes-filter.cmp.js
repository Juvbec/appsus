import eventBus from '../../services/event-bus.service.js';

export default {
    template:`
    <section class="notes-filter">
        <input class="search-bar" type="text" v-model="filter.byTitle" @input="emitFilter" placeholder="Search Note" />
        <div class="filter-checkboxs">
            <label for="byTitle">
                <input class="filter-checkbox" type="checkbox" id="byTitle" ref="byTitle">
                By Title
            </label>
            <label for="byContent">
                <input class="filter-checkbox" type="checkbox" id="byContent" ref="byContent">
                By Content
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            filter: {byTitle: '' , byContent: ''}
        }
    },
    methods : {
        emitFilter() {
            this.filter.byContent = this.filter.byTitle;
            eventBus.$emit('filtered', this.filter)
        }
    },
    computed: {

    }
}