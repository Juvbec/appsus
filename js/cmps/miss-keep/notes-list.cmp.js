

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
            <note-preview v-for="(note, idx) in notes" :note="note"></note-preview>
        </section>
    `,

}