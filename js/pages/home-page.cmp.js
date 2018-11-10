

export default {
    template: `
    <section class="page-content home-page">
        <div class="home-paragraph">
            <h2>Thank you so much for supporting our planet!</h2>
            <p>using our app is greener than sending mails and writing notes</p>
            <h3>all of our incomes are donated for saving the planet</h3>
        </div>
        <div class="home-links">
            <div class="home-page-link home-to-email" @click="goToMisterEmail"></div>
            <div class="home-page-link home-to-notes" @click="goToMissKeep"></div>
        </div>
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