import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
            <note-preview v-for="(note, idx) in notes" @click.native="$emit('editNote', note)" :key="note.id" :note="note"></note-preview>
        </section>
    `,
    methods: {

    },
    created() {
        
    },
    components: {
        notePreview,
    }

}