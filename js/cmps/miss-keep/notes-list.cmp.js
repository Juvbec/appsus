

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
            <button class="new-note-btn" @click="newNote">+</button>
            <note-preview v-for="(note, idx) in notes" :note="note"></note-preview>
        </section>
    `,
    methods: {
        newNote() {
            this.$emit('newNote');
        }
    }

}