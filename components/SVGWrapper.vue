<script>
export default {
    name: "SVGWrapper",
    props: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        content: {
            type: Array,
            default: () => []
        }
    },
    render(createElement) {
        return createElement(
            "svg",
            {
                attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: this.width,
                    height: this.height,
                    viewBox: `0 0 ${this.width} ${this.height}`
                }
            },
            this.content.map(item => createElement(item.type, { attrs: item }))
        );
    }
};
</script>
