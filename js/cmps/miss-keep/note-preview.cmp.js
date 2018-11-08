import notesService from '../../services/miss-keep/notes-service.js';
import eventBus , {NOTES_CHANGE , COLOR_CHANGE} from '../../services/event-bus.service.js';

export default {
    props: ['note'],
    template: `
        <section class="note-preview-container">
            <div class="note-preview-title" ref="noteTitle">
                <span class="note-title">{{note.title}}</span>
                <i @click.stop="pinNote" v-if="note.isPinned" class="fas fa-thumbtack pinned"></i>
                <i @click.stop="pinNote" v-else="" class="fas fa-thumbtack"></i>
            </div>
            <div class="note-preview-content" ref="noteContent">
                <i title="Contains Image" v-if="note.img" class="far fa-image"></i>
                <pre>{{note.content}}</pre>
            </div>
        </section>
    `,
    created() {
        eventBus.$on(COLOR_CHANGE, this.changeColors);
    },
    mounted() {
        this.changeColors();
    },
    methods: {
        pinNote() {
            this.note.isPinned = !this.note.isPinned;
            notesService.saveNote(this.note).then(res => {
                eventBus.$emit(NOTES_CHANGE);
            });
        },
        changeColors() {
            this.$refs['noteTitle'].style.backgroundColor = this.note.bgColor.titleColor;
            this.$refs['noteContent'].style.backgroundColor = this.note.bgColor.contentColor;
            // console.log('changecolors',this.note);
        }
    }
}