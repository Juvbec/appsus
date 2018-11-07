import notesList from '../cmps/miss-keep/notes-list.cmp.js';
import noteService from '../services/miss-keep/notes-service.js';
import newNote from '../cmps/miss-keep/new-note.cmp.js';

export default {
    template: `
    <section class="page-content">
        <h1>Mr. Meeseeks</h1>
        <button class="new-note-btn" @click="newNote">+</button>
        <new-note v-if="isNewNote"></new-note>
        <notes-list :notes="notes" @newNote="addNote"></notes-list>
    </section>
    `,
    data() {
        return {
            notes: null,
            isNewNote: false,
        }
    },
    created() {
        this.notes = noteService.query(); 
    },
    methods: {
        addNote() {
            noteService.addNote();
        },
        newNote() {
            this.isNewNote = !this.isNewNote;
            
        }
    },
    components: {
        notesList,
        newNote,
    }
}