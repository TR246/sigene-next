/*const toRGBA = (color, opacity = 1) => {
    if (color[0] === "#" && color.length === 4)
        return `rgba(${parseInt(color[1] + color[1], 16)}, ${parseInt(
            color[2] + color[2],
            16
        )}, ${parseInt(color[3] + color[3], 16)}, ${opacity})`;
    else if (color[0] === "#" && color.length === 7)
        return `rgba(${parseInt(color.substr(1, 2), 16)}, ${parseInt(
            color.substr(3, 2),
            16
        )}, ${parseInt(color.substr(5, 2), 16)}, ${opacity})`;
    else if (color.slice(0, 4) === "rgba") return color;
    else if (color.slice(0, 3) === "rgb")
        return `rgba(${color
            .slice(color.indexOf("(") + 1, color.indexOf(")"))
            .split(",")
            .map(s => s.trim())
            .join(", ")}, ${opacity})`;
    else return color;
};*/
const toRGBA = (color, opacity = 1) => {
    let r = 0,
        g = 0,
        b = 0,
        a = opacity;
    if (color[0] === "#" && color.length === 4) {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
    } else if (color[0] === "#" && color.length === 7) {
        r = parseInt(color.substr(1, 2), 16);
        g = parseInt(color.substr(3, 2), 16);
        b = parseInt(color.substr(5, 2), 16);
    } else if (color.slice(0, 4) === "rgba") {
        let aa;
        [r, g, b, aa] = color
            .slice(color.indexOf("(") + 1, color.indexOf(")"))
            .split(",")
            .map(s => parseInt(s.trim(), 10));
        a *= aa;
    } else if (color.slice(0, 3) === "rgb") {
        [r, g, b] = color
            .slice(color.indexOf("(") + 1, color.indexOf(")"))
            .split(",")
            .map(s => parseInt(s.trim(), 10));
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default async (contents, housingSize, imageSize) => {
    const canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        createLinearGradient = options => {
            console.log(options);
            const grad = context.createLinearGradient(
                options.from.x,
                options.from.y,
                options.to.x,
                options.to.y
            );
            options.stops.forEach(stop =>
                grad.addColorStop(
                    stop.offset,
                    toRGBA(stop.color, stop.opacity || 1)
                )
            );
            return grad;
        };

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    context.scale(
        imageSize.width / housingSize.width,
        imageSize.height / housingSize.height
    );

    for (let i = 0, { length } = contents; i < length; i++) {
        const item = contents[i];

        // 透明度
        context.globalAlpha = item.opacity || 1;

        // ぼかし
        context.filter = item.blur ? `blur(${item.blur}px)` : "";

        // 画像のとき
        if (item.type === "image") {
            const image = new Image(),
                loaded = new Promise(resolve =>
                    image.addEventListener("load", resolve)
                );
            image.src = item.image;
            await loaded;
            context.drawImage(image, item.x, item.y, item.width, item.height);
            continue;
        }

        // パス
        switch (item.type) {
            case "rect":
                context.beginPath();
                context.rect(item.x, item.y, item.width, item.height);
                break;
        }

        // フィル
        if (typeof item.fill === "string") context.fillStyle = item.fill;
        if (
            typeof item.fill === "object" &&
            item.fill.type === "linearGradient"
        )
            context.fillStyle = createLinearGradient(item.fill);
        if (item.fill) context.fill();

        // ストローク
        context.lineWidth = item["stroke-width"];
        if (typeof item.stroke === "string") context.strokeStyle = item.stroke;
        if (
            typeof item.stroke === "object" &&
            item.stroke.type === "linearGradient"
        )
            context.strokeStyle = createLinearGradient(item.stroke);
        if (item.stroke) context.stroke();
    }

    /*const grad = context.createLinearGradient(0, 0, 500, 0);
    grad.addColorStop(0, "#000");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = grad;
    context.fillRect(0, 0, 500, 500);*/

    // ダウンロード
    const a = document.createElement("a");
    a.download = "駅名標";
    a.href = canvas.toDataURL("image/png");
    a.click();
};
