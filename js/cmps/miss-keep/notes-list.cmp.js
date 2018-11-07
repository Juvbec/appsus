

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
            <note-preview v-for="(note, idx) in notes" :key="note.id" :note="note"></note-preview>
        </section>
    `,
    methods: {

    }

}