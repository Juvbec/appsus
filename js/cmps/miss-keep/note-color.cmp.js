

export default {
    template: `
        <section class="note-color-container">
            <div class="note-color color-white" @click="pickColor('white')"></div>
            <div class="note-color color-yellow" @click="pickColor('yellow')"></div>
            <div class="note-color color-blue" @click="pickColor('blue')"></div>
            <div class="note-color color-green" @click="pickColor('green')"></div>
            <div class="note-color color-purple" @click="pickColor('purple')"></div>
        </section>
    `,
    methods: {
        pickColor(color){
            var bgColor = {};
            switch(color) {
                case 'white':
                    bgColor.titleColor = '#d4d4d4';
                    bgColor.contentColor = '#ececec';
                    break;
                case 'yellow':
                    bgColor.titleColor = '#f8d28c';
                    bgColor.contentColor = '#f1bd5c';
                    break;
                case 'blue':
                    bgColor.titleColor = '#008b8b';
                    bgColor.contentColor = '#48dada';
                    break;
                case 'green':
                    bgColor.titleColor = '#50ca50';
                    bgColor.contentColor = '#90ee90';
                    break;
                case 'purple':
                    bgColor.titleColor = '#ba55d3';
                    bgColor.contentColor = '#d38ae6';
                    break;
            }
            console.log(bgColor)
            // this.$emit('changeColor', bgColor)
        }
    }
}