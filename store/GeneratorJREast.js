export const state = () => ({
    housing: {
        type: "se-led",
        width: 1900,
        height: 600,
        padding: 35,
        "se-led": {
            lighting: true
        },
        "b-fl": {},
        "non-light": {}
    }
});

export const mutations = {
    change(state, { key, value }) {
        const keyArr = key.split(".").map(s => s.trim()),
            last = keyArr.pop();
        let obj = state;
        while (keyArr.length >= 1) {
            obj = obj[keyArr.shift()];
        }
        obj[last] = value;
    }
};
