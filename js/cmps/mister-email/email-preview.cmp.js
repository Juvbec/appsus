

export default {
    props: ['msg'],
    template:`
        <div>
            {{ msg }}
            <button @click="$emit('rm')">x</button>
        </div>
        `
}