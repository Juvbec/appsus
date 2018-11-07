

export default {
    props: ['email'],
    template:`
        <section class="email-prev">
            <h3>{{email.subject}}</h3>
            <h6 v-if="email.isMine">to {{email.to}}</h6>
            <h6 v-else>from {{email.from}}</h6>
            <button @click="$emit('rm')">x</button>
        </section>
        `
}