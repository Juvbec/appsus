

export default {
    template: `
        <section class="note-color-container">
            <div class="speech-bubble">
                <div ref="white" class="note-color color-white" @click="pickColor('white')"></div>
                <div ref="yellow" class="note-color color-yellow" @click="pickColor('yellow')"></div>
                <div ref="blue" class="note-color color-blue" @click="pickColor('blue')"></div>
                <div ref="green" class="note-color color-green" @click="pickColor('green')"></div>
                <div ref="purple" class="note-color color-purple" @click="pickColor('purple')"></div>
            </div>
        </section>
    `,
    methods: {
        pickColor(color){
            var bgColor = {};
            switch(color) {
                case 'white':
                    bgColor.titleColor = '#d4d4d4';
                    bgColor.contentColor = '#ececec';
                    bgColor.className = 'white';
                    break;
                case 'yellow':
                    bgColor.titleColor = '#f8d28c';
                    bgColor.contentColor = '#f1bd5c';
                    bgColor.className = 'yellow';
                    break;
                case 'blue':
                    bgColor.titleColor = '#008b8b';
                    bgColor.contentColor = '#48dada';
                    bgColor.className = 'blue';
                    break;
                case 'green':
                    bgColor.titleColor = '#50ca50';
                    bgColor.contentColor = '#90ee90';
                    bgColor.className = 'green';
                    break;
                case 'purple':
                    bgColor.titleColor = '#ba55d3';
                    bgColor.contentColor = '#d38ae6';
                    bgColor.className = 'purple';
                    break;
            }
            // console.log(bgColor);
            for (let i = 0 ; i < Object.keys(this.$refs).length ; i++) {
                let curr = Object.keys(this.$refs)[i];
                this.$refs[curr].style.border = '1px solid black';
            }
            this.$refs[bgColor.className].style.border = '3px solid black';
            this.$emit('changeColor', bgColor);
        }
    }
}