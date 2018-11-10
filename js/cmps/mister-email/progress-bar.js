

export default {
    props: ['progress'],
    template:` 
        <section class="progress-bar">
            <div></div class="progerss" :style="{width: progressUnits}">
        </section>
    `,
    computed: {
        progressUnits() {
            return this.progress + '%'
        }
    }
}