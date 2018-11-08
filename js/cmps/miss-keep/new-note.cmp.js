import noteService from '../../services/miss-keep/notes-service.js';
import eventBus , {NOTES_CHANGE} from '../../services/event-bus.service.js';
import noteColor from './note-color.cmp.js';

export default {
    props: ['currNote'],
    template: `
        <section class="new-note-container">
            <div class="screen-blur" @click="discardNote">
                <div class="new-note-modal" @click.stop>
                    <form @submit.prevent="" class="new-note-form">
                        <input ref="noteTitle" type="text" placeholder="Title" v-model="note.title" />
                        <textarea ref="content" placeholder="Take a note..." v-model="note.content"></textarea>
                    </form>
                    <div class="note-control-panel">
                        <note-color @changeColor="setColor"></note-color>
                        <label class="file-select">
                            <i class="select-button fas fa-image"></i>
                            <input type="file" accept="image/*" @change="handleFileChange"/>
                        </label>
                        <i title="Discard" class="fas fa-trash" @click="deleteNote"></i>
                        <i title="Save" class="fas fa-check" @click="addNote"></i>
                    </div>
                    <div class="img-container">
                        <i title="Discard" class="far fa-trash-alt" @click="deleteImg"></i>
                        <img v-if="note.img" :src="note.img" ref="noteImgContent" class="note-img"/>
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
                bgColor: {titleColor: '#d4d4d4', contentColor: '#ececec'},
                img: null,
            }, 
            value: undefined,
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
            if (this.note.title.trim().length || this.note.content.trim().length || this.note.img){
                if (!confirm('Discard note?')) {
                    return;
                }
                else this.$emit('closeModal');
                eventBus.$emit(NOTES_CHANGE);
            } else {
                this.$emit('closeModal');
            }
        },
        deleteNote() {
            if (this.note.title.trim().length || this.note.content.trim().length || this.note.img){
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
        },
        setColor(bgColor) {
            // console.log(bgColor);
            this.note.bgColor = bgColor;
            eventBus.$emit(NOTES_CHANGE);
            this.$refs['noteTitle'].style.backgroundColor = bgColor.titleColor;
            this.$refs['content'].style.backgroundColor = bgColor.contentColor;
            console.log(this.note)
        },
        handleFileChange(ev) {
            // this.note.img = ev.target.files[0];
            if (ev.target.files[0]) {
                var FR = new FileReader();
                FR.readAsDataURL( ev.target.files[0] );
                FR.onload = () => {
                    this.note.img = FR.result;
                    eventBus.$emit(NOTES_CHANGE);
                    // console.log(this.note.img)
                }
            }
        },
        deleteImg() {
            if (!confirm('Delete image?')) return;
            else this.note.img = '';
        }
    },
    components: {
        noteColor,
    }

}