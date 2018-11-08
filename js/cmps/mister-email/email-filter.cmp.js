
export default {
    template: `
    <section class="emails-filter">
        <div class="filter-radios">
            <input name="filter-radio" class="filter-radio" type="radio" id="allRadio" value="all" ref="allRadio" @change="debug('all')">
            <label for="allRadio">All</label>
            
            <input name="filter-radio" class="filter-radio" type="radio" id="readRadio" value="read" ref="readRadio" @change="debug('read')" >
            <label for="readRadio">Read</label>

            <input name="filter-radio" class="filter-radio" type="radio" id="unReadRadio" value="unread" ref="unReadRadio" @change="debug('unread')" >
            <label for="unReadRadio">UnRead</label>
        </div>
    </section>
    `,
    data() {
        return {

        }
    },
    methods : {
        debug(radio) {
            console.log(radio)
        }
    },
}