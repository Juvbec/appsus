import emailPreview from './email-preview.cmp.js'


export default {
    template: `
        <email-preview v-for="email in emails"
                       class="email-prev"
                       :email="email"
                       :key="email.id"
                       @rm="remove(email)"></email-preview>
    `,
    data() {
        return {
            emails: []
        }
    },
    methods: {
        insert() {
            var i = Math.round(Math.random() * this.items.length)
            this.items.splice(i, 0, id++)
        },
        shuffle() {
            this.items = _.shuffle(this.items)
        },
        remove(item) {
            var i = this.items.indexOf(item)
            if (i > -1) {
                this.items.splice(i, 1)
            }
        }
    },
    components: {
        emailPreview
    }
}