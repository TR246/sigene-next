const pathArrayToStr = array =>
    array
        .map((node, i) => {
            if (node.close) return "z";
            if (i === 0 || array[i - 1].close || node.begin)
                return `M ${node.x} ${node.y}`;
            if (node.curve === "cubic")
                return `C ${node.x1} ${node.y1}, ${node.x2} ${node.y2}, ${
                    node.x
                } ${node.y}`;
            if (node.curve === "quadratic")
                return `Q ${node.x1} ${node.y1}, ${node.x} ${node.y}`;
            // ここから直線
            const isInX = "x" in node,
                isInY = "y" in node;
            if (isInX && !isInY) return `H ${node.x}`;
            else if (!isInX && isInY) return `V ${node.y}`;
            else return `L ${node.x} ${node.y}`;
        })
        .join(",");
/*
[
    { x: 0, y: 0 }, // M 0 0
    { x: 20, y: 20 }, // L 20 20
    { x: 50 }, // H 50
    { y: 50 }, // V 50
    { curve: "cubic", x1: 70, y1: 50, x2: 70, y2: 100, x: 50, y: 100 }, // C 70 50 70 100 50 100
    { x: 0 }, // H 0
    { close: true }, // z
    { x: 200, y: 0 }, // M 200 0
    { y: 100 }, // V 100
    { begin: true, x: 300, y: 0 }, // M 300 0
    { y: 200 } // V 200
]
*/

let countForId = 0;

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
        const defs = [],
            createId = () => `SVGWrapperComponent_${countForId++}`,
            objectToDocument = ({ name, attrs = {}, children = [] }) =>
                createElement(
                    name,
                    { attrs },
                    children.map(child => objectToDocument(child))
                ),
            createGradient = props => {
                const attrs = {
                    id: createId(),
                    gradientUnits: "userSpaceOnUse"
                };
                switch (props.type) {
                    case "linearGradient":
                        attrs.x1 = props.from.x;
                        attrs.y1 = props.from.y;
                        attrs.x2 = props.to.x;
                        attrs.y2 = props.to.y;
                        break;
                    /*case "radialGradient":
                        attrs.cx = props.center.x;
                        attrs.cy = props.center.y;
                        if (props.focus) {
                            attrs.fx = props.focus.x;
                            attrs.fy = props.focus.y;
                        }
                        attrs.r = props.radius;
                        break;*/
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
            createFilter = props => {
                const attrs = {
                    id: createId(),
                    x: props.x,
                    y: props.y,
                    width: props.width,
                    height: props.height,
                    filterRes: props.filterRes,
                    filterUnits: props.filterUnits,
                    primitiveUnits: props.primitiveUnits
                };
                defs.push(
                    createElement(
                        "filter",
                        { attrs },
                        props.filters.map(filter => objectToDocument(filter))
                    )
                );
                return `url(#${attrs.id})`;
            },
            contents = JSON.parse(JSON.stringify(this.contents)).map(item => {
                if (item.type === "path") item.d = pathArrayToStr(item.d);
                if (item.image) {
                    item["xlink:href"] = `http://localhost:3000${item.image}`;
                    delete item.image;
                }

                if (!item.fill) item.fill = "none";
                if (!item.stroke) item.stroke = "none";

                if (typeof item.fill === "object")
                    item.fill = createGradient(item.fill);

                if (typeof item.stroke === "object")
                    item.stroke = createGradient(item.stroke);

                if (item.filter) item.filter = createFilter(item.filter);
                else if (item.blur)
                    item.filter = createFilter({
                        filters: [
                            {
                                name: "feGaussianBlur",
                                attrs: {
                                    in: "SourceGraphic",
                                    stdDeviation: item.blur
                                }
                            }
                        ]
                    });

                return createElement(item.type, { attrs: item });
            });

        // ルートのsvg
        return createElement(
            "svg",
            {
                attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    width: this.width,
                    height: this.height,
                    viewBox: `0 0 ${this.width} ${this.height}`
                }
            },
            [createElement("defs", defs), ...contents]
        );
    }
};
