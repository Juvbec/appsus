import noteService from '../../services/miss-keep/notes-service.js';


export default {
    template: `
        <section class="new-note-container">
            <div class="screen-blur" @click="this.$emit('closeModal')"></div>
            <div class="new-note-modal">
                <form @submit.prevent="" class="new-note-form">
                    <input type="text" placeholder="Title" v-model="note.title" />
                    <textarea ref="content" placeholder="Take a note..." v-model="note.content"></textarea>
                </form>
                <div class="note-control-panel">
                    <i title="Discard" class="fas fa-trash"></i>
                    <i title="Save" class="fas fa-check"></i>
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
                bgColor: '',
            }
        }
    },
    mounted() {
        this.$refs.content.focus();
    },
    methods: {
        addNote() {
            // noteService.addNote(this.note);
            console.log(this.note)
        },
    }

}