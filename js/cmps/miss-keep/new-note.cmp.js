import noteService from '../../services/miss-keep/notes-service.js';
import eventBus , {NOTES_CHANGE} from '../../services/event-bus.service.js';


export default {
    props: ['currNote'],
    template: `
        <section class="new-note-container">
            <div class="screen-blur" @click="discardNote">

                <div class="new-note-modal" @click.stop>
                    <form @submit.prevent="" class="new-note-form">
                        <input type="text" placeholder="Title" v-model="note.title" />
                        <textarea ref="content" placeholder="Take a note..." v-model="note.content"></textarea>
                    </form>
                    <div class="note-control-panel">
                        <i title="Discard" class="fas fa-trash" @click="deleteNote"></i>
                        <i title="Save" class="fas fa-check" @click="addNote"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            note: {
                title: '',
                content: '',
                isPinned: false,
                at: '',
                bgColor: '#f5deb3',
            }
        }
    },
    created() {
        if (this.currNote) this.note = this.currNote;
    },
    mounted() {
        this.$refs.content.focus();
    },
    methods: {
        addNote() {
            if (this.note.at === '') this.note.at = Date.now();
            // console.log(this.note)
            noteService.addNote(this.note).then(res => {
                eventBus.$emit(NOTES_CHANGE);
            });
            this.$emit('closeModal');
        },
        discardNote() {
            // console.log(this.note.title.trim().length , this.note.content.trim().length)
            if (this.note.title.trim().length || this.note.content.trim().length){
                if (!confirm('Discard note?')) return;
                else this.$emit('closeModal');
            } else {
                this.$emit('closeModal');
            }
        },
        deleteNote() {
            if (this.note.title.trim().length || this.note.content.trim().length){
                if (!confirm('Delete note?')) return;
                else {
                    noteService.deleteNote(this.note.id).then(res=> {
                        eventBus.$emit(NOTES_CHANGE);
                    });
                    this.$emit('closeModal');
                }
            } else {
                this.$emit('closeModal');
            }
        }
    }

}