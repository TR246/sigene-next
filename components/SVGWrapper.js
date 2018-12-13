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
        contents: {
            type: Array,
            default: () => []
        }
    },
    render(createElement) {
        let count = 0;
        const createId = () => `SVGWrapperComponent_${this._uid}_${count++}`,
            defs = [],
            createGradient = props => {
                const attrs = {
                    id: createId(),
                    gradientUnits: props.gradientUnits || "objectBoundingBox",
                    spreadMethod: props.spreadMethod || "pad"
                };
                switch (props.type) {
                    case "linearGradient":
                        attrs.x1 = props.from.x;
                        attrs.y1 = props.from.y;
                        attrs.x2 = props.to.x;
                        attrs.y2 = props.to.y;
                        break;
                    case "radialGradient":
                        attrs.cx = props.center.x;
                        attrs.cy = props.center.y;
                        if (props.focus) {
                            attrs.fx = props.focus.x;
                            attrs.fy = props.focus.y;
                        }
                        attrs.r = props.radius;
                        break;
                }
                defs.push(
                    createElement(
                        props.type,
                        { attrs },
                        props.stops.map(stop =>
                            createElement("stop", {
                                attrs: {
                                    offset: stop.offset,
                                    "stop-color": stop.color,
                                    "stop-opacity": stop.opacity
                                }
                            })
                        )
                    )
                );
                return `url(#${attrs.id})`;
            },
            contents = this.contents.map(item => {
                if (typeof item.fill === "object")
                    item.fill = createGradient(item.fill);
                if (typeof item.stroke === "object")
                    item.stroke = createGradient(item.stroke);
                console.log(item);
                return createElement(item.type, { attrs: item });
            });

        // ルートのsvg
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
            [createElement("defs", defs), ...contents]
        );
    }
};
