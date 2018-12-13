export const pathArrayToStr = array =>
    array
        .map((node, i) => {
            if (i === 0) return `M ${node.x} ${node.y}`;
            const isInX = "x" in node,
                isInY = "y" in node;
            if (isInX && !isInY) return `H ${node.x}`;
            else if (!isInX && isInY) return `V ${node.y}`;
            else return `L ${node.x} ${node.y}`;
        })
        .join(",") + "z";
