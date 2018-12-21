import createId from "uuid/v4";

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
            .join(","),
    objectToDocument = (
        { createElement },
        { name, attrs = {}, children = [] }
    ) =>
        createElement(
            name,
            { attrs },
            children.map(child => objectToDocument(child))
        ),
    createGradient = ({ createElement, defs }, props) => {
        const attrs = {
            id: createId(),
            gradientUnits: props.gradientUnits || "userSpaceOnUse"
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
    createFilter = ({ createElement, defs }, props) => {
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
                props.filters.map(filter =>
                    objectToDocument({ createElement }, filter)
                )
            )
        );
        return `url(#${attrs.id})`;
    },
    parseIterator = (context, iterator, arg) => {
        const { createElement } = context,
            defs = context.defs || [],
            items = context.items || [],
            newContext = { createElement, defs, items },
            { value: item, done } = iterator.next(arg);
        if (done) return { defs, items };

        const attrs = { ...item },
            children = [],
            isDef =
                item.type === "clipPath" ||
                item.type === "mask" ||
                item.isDefinition ||
                item.requireReference;

        delete attrs.type;
        delete attrs.image;
        delete attrs.children;

        let newArg = null;

        // グループまたはクリップパスまたはマスク
        if (
            item.type === "g" ||
            item.type === "clipPath" ||
            item.type === "mask"
        ) {
            const childTree = parseIterator(
                { createElement },
                item.children[Symbol.iterator]()
            );
            defs.push(...childTree.defs);
            children.push(...childTree.items);
        }

        // 一回限りのクリップパスまたはマスク
        if (item.clipPath || item.mask) {
            const key = item.clipPath ? "clipPath" : "mask",
                result = parseIterator(
                    { createElement },
                    item[key][Symbol.iterator]()
                ),
                id = createId();
            defs.push(
                ...result.defs,
                createElement(key, { attrs: { id } }, result.items)
            );
            attrs[key] = `url(#${id})`;
        }

        // パス
        if (item.type === "path") attrs.d = pathArrayToStr(item.d);

        // 画像
        if (item.type === "image") attrs["xlink:href"] = item.image;

        // フィルとストローク
        if (!isDef && item.type !== "g" && !item.fill) attrs.fill = "none";
        if (!isDef && item.type !== "g" && !item.stroke) attrs.stroke = "none";
        if (typeof item.fill === "object")
            attrs.fill = createGradient(newContext, item.fill);
        if (typeof item.stroke === "object")
            attrs.stroke = createGradient(newContext, item.stroke);

        // フィルターとぼかし
        if (item.filter) attrs.filter = createFilter(newContext, item.filter);
        else if (item.blur)
            attrs.filter = createFilter(newContext, {
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

        // 参照の要求
        if (isDef) {
            attrs.id = createId();
            newArg = `url(#${attrs.id})`;
        }

        const el = createElement(item.type, { attrs }, children);
        if (
            item.type === "clipPath" ||
            item.type === "mask" ||
            item.isDefinition
        )
            defs.push(el);
        else items.push(el);

        return parseIterator(newContext, iterator, newArg);
    };

export default (createElement, iterator, { width, height }) => {
    const { defs, items } = parseIterator({ createElement }, iterator);
    return createElement(
        "svg",
        {
            attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                width: width,
                height: height,
                viewBox: `0 0 ${width} ${height}`
            }
        },
        [createElement("defs", defs), ...items]
    );
};
