

export default {
    props: ['progress'],
    template:` 
        <section class="progress-bar">
            <div class="progress" :style="{width: progressUnits}"></div>
            <span class="progress-precentage">{{progress}}%</span>
        </section>
    `,
    computed: {
        progressUnits() {
            return this.progress + '%'
        }
    }
}