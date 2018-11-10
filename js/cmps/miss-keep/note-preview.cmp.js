import noteService from '../../services/miss-keep/notes-service.js';
import eventBus , {NOTES_CHANGE , COLOR_CHANGE , DELETE_NOTE, NOTE_TO_PLACE} from '../../services/event-bus.service.js';
// import todosListCmp from './todos-list.cmp.js';
import noteMenu from './note-menu.cmp.js';

export default {
    props: ['note'],
    template: `
        <section ref="container" class="note-preview-container">
            <div v-show="isSwipedForDelete" ref="swipeDelete" class="swipe-delete">
                <i title="Discard" class="far fa-trash-alt" @click.stop="deleteNote"></i>
            </div>
            <div v-show="isSwipedForPin" ref="swipePin" class="swipe-pin" @click.stop="pinNote">
                <i v-if="note.isPinned" class="fas fa-thumbtack pinned"></i>
                <i v-else="" class="fas fa-thumbtack"></i>
            </div>
            <div class="note-preview-title" ref="noteTitle">
                <span class="note-title">{{note.title}}</span>
                <i @click.stop="pinNote" v-if="note.isPinned" class="fas fa-thumbtack pinned"></i>
                <i @click.stop="pinNote" v-else="" class="fas fa-thumbtack"></i>
            </div>
            <div class="note-preview-content" ref="noteContent">
                <i title="Contains Image" v-if="note.img" class="far fa-image"></i>
                <pre>{{note.content}}</pre>
                <img ref="contentImg" src=""/>
                <div v-if="note.todos.length" class="noteTodos">
                    <li v-for="todo in note.todos" :class="{ 'todo-completed': todo.completed }">{{todo.title}}</li>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isSwipedForDelete: false,
            isSwipedForPin: false,
        }
    },
    created() {
        eventBus.$on(COLOR_CHANGE, this.setStyle);
    },
    mounted() {
        this.setStyle();
        eventBus.$on(NOTE_TO_PLACE, this.containerBackToPlace);
        if (window.outerWidth < 468) this.enableSwipeActions();
    },
    methods: {
        pinNote() {
            this.note.isPinned = !this.note.isPinned;
            noteService.saveNote(this.note).then(res => {
                this.$refs.swipePin.style.opacity = 0;  
                this.$refs.container.style.transform = 'translateX(0)';
                eventBus.$emit(NOTES_CHANGE);
            });
        },
        setStyle() {
            this.$refs.noteTitle.style.backgroundColor = this.note.bgColor.titleColor;
            if (this.note.img) {
                let img = this.$refs.contentImg;
                img.src = this.note.img;
                img.style.maxWidth = '100%';
            } 
            this.$refs['noteContent'].style.backgroundColor = this.note.bgColor.contentColor;
        },
        deleteNote(note = this.note) {
            noteService.deleteNote(note.id).then(res => {
                this.$refs.container.style.opacity = 0;
                this.$refs.container.style.transform = 'translateX(100%)';
                eventBus.$emit(NOTES_CHANGE);
            });
        },
        containerBackToPlace() {
            this.isSwipedForDelete = false;
            this.isSwipedForPin = false;
            this.$refs.container.style.transform = 'translateX(0)';
            this.$refs.swipeDelete.style.opacity = 0;
            this.$refs.swipePin.style.opacity = 0;
        },
        enableSwipeActions() {
            var hammer = new Hammer(this.$refs.container);
            hammer.on('swiperight', ev => {
                // console.log(ev)
                this.$refs.container.style.transform = 'translateX(30%)'
                this.$refs.swipeDelete.style.opacity = 1;
                this.$refs.swipeDelete.style.color = 'red';
                this.isSwipedForDelete = true;
            });
            hammer.on('swipeleft', ev => {
                this.isSwipedForPin = true;
                this.$refs.container.style.transform = 'translateX(-30%)';
                this.$refs.swipePin.style.opacity = 1;
            });
        },

    },
    computed: {
            
    },
    components: {
        noteMenu,
    }
}