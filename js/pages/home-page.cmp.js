

export default {
    template: `
    <section class="page-content home-page">
        <div class="home-page-link" @click="goToMisterEmail">MisterEmail</div>
        <div class="home-page-link" @click="goToMissKeep">MissKeep</div>
    </section>
    `,
    methods: {
        goToMissKeep() {
            this.$router.push('/misskeep');
        },
        goToMisterEmail() {
            this.$router.push('/misteremail');
        }
    }

}