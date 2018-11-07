
export default {
    template: `
        <section class="new-note-container">
            <form @submit.prevent="" class="new-note-form">
                <input type="text" placeholder="Title" />
                <textarea ref="content" placeholder="Take a note..."></textarea>
            </form>
        </section>
    `,
    mounted() {
        this.$refs.content.focus();
    },

}