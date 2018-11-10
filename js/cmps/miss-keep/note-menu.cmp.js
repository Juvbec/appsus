import eventBus, {NOTES_CHANGE, DELETE_NOTE } from '../../services/event-bus.service.js';
import noteService from '../../services/miss-keep/notes-service.js';


export default {
    props: ['note'],
    template: `
        <section class="floating-menu-container">
            <div class="bubble" @click.stop="deleteNote">
                <i title="Discard" class="fas fa-trash"></i>   
            </div>
            <div class="bubble" @click.stop="pinNote">
                <i v-if="note.isPinned" class="fas fa-thumbtack pinned"></i>
                <i v-else="" class="fas fa-thumbtack"></i>
            </div>
        </section>
    `,
    methods: {
        deleteNote() {
            eventBus.$emit(DELETE_NOTE, this.note);
        },
        pinNote() {
            this.note.isPinned = !this.note.isPinned;
            noteService.saveNote(this.note).then(res => {
                eventBus.$emit(NOTES_CHANGE);
            });
        },
    }
}