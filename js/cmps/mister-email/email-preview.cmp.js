

export default {
    props: ['email'],
    template:`
        <div>
            <h3>{{email.subject}}</h3>
            <h6 v-if="email.isMine">to {{email.to}}</h6>
            <h6 v-else>tfrom {{email.from}}</h6>
            <button @click="$emit('rm')">x</button>
        </div>
        `
}