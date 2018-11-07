import notesList from '../cmps/miss-keep/notes-list.cmp.js';
import noteService from '../services/miss-keep/notes-service.js';

export default {
    template: `
    <section class="page-content">
        <h1>Mr. Meeseeks</h1>
        <notes-list v-if="!newNote" :notes="notes" @newNote="addNote"></notes-list>
    </section>
    `,
    data() {
        return {
            notes: null,
            newNote: false,
        }
    },
    created() {
        this.notes = noteService.query(); 
    },
    methods: {
        addNote() {
            noteService.addNote();
        }
    },
    components: {
        notesList,
    }
}