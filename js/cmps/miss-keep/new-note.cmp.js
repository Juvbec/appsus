import noteService from '../../services/miss-keep/notes-service.js';
import eventBus, { NOTES_CHANGE, COLOR_CHANGE, SAVE_NOTE, DELETE_NOTE } from '../../services/event-bus.service.js';
import noteColor from './note-color.cmp.js';
import todosList from './todos-list.cmp.js';

export default {
    props: ['currNote'],
    template: `
        <section class="new-note-container">
            <div class="screen-blur" @click="discardNote">
                <div class="new-note-modal" @click.stop>
                    <div class="img-text-container">
                        <form @submit.prevent="" class="new-note-form">
                            <i @click.stop="pinNote" v-if="note.isPinned" class="fas fa-thumbtack pinned"></i>
                            <i @click.stop="pinNote" v-else="" class="fas fa-thumbtack"></i>
                            <input @click="openColorPalette = false" ref="noteTitle" type="text" placeholder="Title" v-model="note.title" />
                            <textarea @click="openColorPalette = false" ref="content" placeholder="Take a note..." v-model="note.content"></textarea>
                            <span v-if="note.at" class="edit-time">Edited {{editTime}}</span>
                        </form>
                        <div class="img-container">
                            <i title="Discard" class="far fa-trash-alt" @click="deleteImg"></i>
                            <img v-if="note.img" :src="note.img" ref="noteImgContent" class="note-img"/>
                        </div>
                    </div>
                    <div class="note-control-panel">
                        <i class="fas fa-palette" @click="openColorPalette = !openColorPalette">
                            <transition name="fade">
                                <note-color v-if="openColorPalette" @changeColor="setColor"></note-color>
                            </transition>
                        </i>
                        <label class="file-select">
                            <i class="select-button fas fa-image"></i>
                            <input type="file" accept="image/*" @change="handleFileChange"/>
                        </label>
                        <i class="fas fa-list-alt" :class="todoClasses" @click="onTodoIconClicked"></i>
                        <i title="Discard" class="fas fa-trash" @click="deleteNote"></i>
                        <i title="Save" class="fas fa-check" @click="addNote"></i>
                    </div>
                    <todos-list v-if="note.isTodo" :note="note"></todos-list>
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
                bgColor: { titleColor: '#d4d4d4', contentColor: '#ececec' },
                img: null,
                isTodo: false,
                todos: '',
            },
            value: undefined,
            openColorPalette: false,
        }
    },
    created() {
        if (this.currNote) this.note = this.currNote;
        eventBus.$on(DELETE_NOTE, note => {
            this.deleteNote(note);
        })
    },
    mounted() {
        if (this.currNote) this.setColor(this.currNote.bgColor);
        this.$refs.content.focus();
    },
    methods: {
        addNote() {
            this.note.at = Date.now();
            if (!this.note.todos.length) this.note.isTodo = false;
            // console.log(this.note)
            noteService.addNote(this.note).then(res => {
                eventBus.$emit(NOTES_CHANGE);
                eventBus.$emit(SAVE_NOTE);
            });
            this.$emit('closeModal');
        },
        discardNote() {
            // console.log(this.note.title.trim().length , this.note.content.trim().length)
            if (this.note.title.trim().length || this.note.content.trim().length || this.note.img || this.note.todos.length) {
                if (!confirm('Discard changes?')) {
                    return;
                }
                else this.$emit('closeModal');
                if (!this.note.todos.length) this.note.isTodo = false;
                eventBus.$emit(NOTES_CHANGE);
            } else {
                this.$emit('closeModal');
            }
        },
        deleteNote(ev , note = this.note) {
            if (note.title.trim().length || note.content.trim().length || note.img || note.todos.length) {
                if (!confirm('Delete note?')) return;
                else {
                    noteService.deleteNote(note.id).then(res => {
                        eventBus.$emit(NOTES_CHANGE);
                    });
                    this.$emit('closeModal');
                }
            } else {
                if (note.id) {
                    noteService.deleteNote(note.id).then(res => {
                        eventBus.$emit(NOTES_CHANGE);
                    });
                }
                this.$emit('closeModal');
            }
        },
        setColor(bgColor) {
            // console.log(bgColor);
            this.note.bgColor = bgColor;
            this.$refs['noteTitle'].style.backgroundColor = bgColor.titleColor;
            this.$refs['content'].style.backgroundColor = bgColor.contentColor;
            if (!this.currNote) return;
            eventBus.$emit(COLOR_CHANGE);
            // console.log(this.note)
        },
        handleFileChange(ev) {
            // this.note.img = ev.target.files[0];
            if (ev.target.files[0]) {
                var FR = new FileReader();
                FR.readAsDataURL(ev.target.files[0]);
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
        },
        onTodoIconClicked() {
            this.note.isTodo = !this.note.isTodo;
            console.log('todo clicked', this.note.isTodo);
        },
        pinNote() {
            this.note.isPinned = !this.note.isPinned;
            noteService.saveNote(this.note).then(res => {
                eventBus.$emit(NOTES_CHANGE);
            });
        },
    },
    computed: {
        todoClasses() {
            return {
                clicked: (this.note.isTodo)
            }
        },
        editTime() {
            return moment(this.note.at).fromNow();
        }
    },
    components: {
        noteColor,
        todosList,
    }

}