import eventBus from '../../services/event-bus.service.js';

export default {
    template:`
    <section class="notes-filter">
        <input class="search-bar" type="text" v-model="filterKey" @input="emitFilter" placeholder="Search Note" />
        <div class="filter-checkboxs">
            <label for="byTitle">
                <input class="filter-checkbox" type="checkbox" id="byTitle" ref="byTitle" checked @change="emitFilter">
                By Title
            </label>
            <label for="byContent">
                <input class="filter-checkbox" type="checkbox" id="byContent" ref="byContent" checked @change="emitFilter">
                By Content
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            filterKey: '',
            filter: {byTitle: '' , byContent: ''}
        }
    },
    methods : {
        emitFilter() {
            if (this.$refs.byContent.checked) {
                this.filter.byContent = this.filterKey;
            } else this.filter.byContent = '';
            if (this.$refs.byTitle.checked) {
                this.filter.byTitle = this.filterKey;
            } else this.filter.byTitle = '';
            eventBus.$emit('filtered', this.filter)
        }
    },
    computed: {

    }
}