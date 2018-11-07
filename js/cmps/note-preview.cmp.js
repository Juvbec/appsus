

export default {
    props: ['note'],
    template: `
        <section class="note-preview-container">
            <div class="note-preview-title">
                <span class="note-title">{{note.title}}</span>
            </div>
            <div class="note-preview-content">
                <pre>{{note.content}}</pre>
            </div>
        </section>
    `,
}