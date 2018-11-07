

export default {
    props: ['note'],
    template: `
        <section class="note-preview-container">
            <div class="note-preview-title" ref="noteTitle">
                <span class="note-title">{{note.title}}</span>
            </div>
            <div class="note-preview-content" ref="noteContent">
                <pre>{{note.content}}</pre>
            </div>
        </section>
    `,
    created() {
        // console.log(this.note)
    },
    mounted() {
        this.$refs['noteTitle'].style.backgroundColor = this.note.bgColor.titleColor;
        this.$refs['noteContent'].style.backgroundColor = this.note.bgColor.contentColor;
    },
    computed: {

    }
}