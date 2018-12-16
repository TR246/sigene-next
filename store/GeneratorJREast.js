import generator from "~/assets/GeneratorJREast/generator.js";

export const state = () => ({
    housing: {
        type: "se-led",
        width: 1900,
        height: 600,
        padding: 35,
        lighting: false,
        stickers: "shin-insha,emo-train-kankyo-led,ro-ene"
    },
    useNumbering: true,
    fonts: {
        janapese: "",
        engligh: "",
        chinese: "",
        korean: ""
    }
});

export const getters = {
    contents: generator
};

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
