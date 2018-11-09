import eventBus, { DELETE_NOTE } from '../../services/event-bus.service.js';

export default {
    props: ['note'],
    template: `
        <section class="floating-menu-container">
            <div class="bubble" @click.stop="deleteNote">
                <i title="Discard" class="fas fa-trash"></i>   
            </div>
        </section>
    `,
    methods: {
        deleteNote() {
            eventBus.$emit(DELETE_NOTE, this.note);
        }
    }
}