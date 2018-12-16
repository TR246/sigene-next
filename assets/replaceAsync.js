export default (str, re, callback) => {
    const parts = [];
    let i = 0;
    if (Object.prototype.toString.call(re) == "[object RegExp]") {
        if (re.global) re.lastIndex = i;
        let match;
        while ((match = re.exec(str))) {
            parts.push(
                str.slice(i, match.index),
                callback(...match, match.index, match.input)
            );
            i = re.lastIndex;
            if (!re.global) break;
            if (match[0].length == 0) re.lastIndex++;
        }
    } else {
        re = String(re);
        i = str.indexOf(re);
        parts.push(str.slice(0, i), callback(re, i, str));
        i += re.length;
    }
    parts.push(str.slice(i));
    return Promise.all(parts).then(s => s.join(""));
};
