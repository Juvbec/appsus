import noteService from '../../services/miss-keep/notes-service.js';



export default {
    template: `
        <section class="new-note-container">
            <div class="screen-blur" @click="discardNote">

                <div class="new-note-modal" @click.stop>
                    <form @submit.prevent="" class="new-note-form">
                        <input type="text" placeholder="Title" v-model="note.title" />
                        <textarea ref="content" placeholder="Take a note..." v-model="note.content"></textarea>
                    </form>
                    <div class="note-control-panel">
                        <i title="Discard" class="fas fa-trash" @click="discardNote"></i>
                        <i title="Save" class="fas fa-check" @click="addNote"></i>
                    </div>
                </div>
            </div>
            {{note}}
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
    mounted() {
        this.$refs.content.focus();
    },
    methods: {
        addNote() {
            this.note.at = Date.now();
            console.log(this.note)
            noteService.saveNote(this.note);
            this.$emit('closeModal');
        },
        discardNote() {
            console.log(this.note.title.trim().length , this.note.content.trim().length)
            if (this.note.title.trim().length || this.note.content.trim().length){
                if (!confirm('Discard note?')) return;
                else this.$emit('closeModal');
            } else {
                this.$emit('closeModal');
            }
        }
    }

}