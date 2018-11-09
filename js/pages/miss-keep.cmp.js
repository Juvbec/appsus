import notesList from '../cmps/miss-keep/notes-list.cmp.js';
import noteService from '../services/miss-keep/notes-service.js';
import newNote from '../cmps/miss-keep/new-note.cmp.js';
import notesFilter from '../cmps/miss-keep/notes-filter.cmp.js';

export default {
    template: `
    <section class="page-content">
    <transition name="bounce">
        <new-note class="new-note-cmp" v-if="isNewNote" @addedNote="updateNotes" :currNote="currNote" @closeModal="newNote"></new-note>
    </transition>
        <div class="action-bar">
            <notes-filter class="search-bar"></notes-filter>
            <button v-if="!isNewNote" class="new-note-btn" @click="newNote">+</button>
        </div>
        <transition name="fade">
            <notes-list @editNote="editNote" v-if="notes"></notes-list>
        </transition>
    </section>
    `,
    data() {
        return {
            notes: null,
            isNewNote: false,
            currNote: null
        }
    },
    created() {
        this.updateNotes();
    },
    methods: {
        newNote() {
            this.currNote = null;
            // console.log('isNewNote', this.isNewNote)
            this.isNewNote = !this.isNewNote;
        },
        updateNotes() {
            // console.log('updateNotes')
            noteService.query().then(notes => {
                this.notes = notes;
            });
        },
        editNote(noteToEdit) {
            this.currNote = noteToEdit;
            this.isNewNote = true;
            // this.currNote = null;
        },

    },
    components: {
        notesList,
        newNote,
        notesFilter,
    }
}