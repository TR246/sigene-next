import generator from "~/assets/GeneratorJREast/generator.js";

export const state = () => ({
    housing: {
        type: "se-led",
        width: 1900,
        height: 600,
        padding: 35,
        lighting: false,
        stickers: ["shin-insha", "emo-train", "kankyo-led", "ro-ene"]
    },
    useNumbering: true,
    fonts: {
        janapese: "",
        engligh: "",
        chinese: "",
        korean: ""
    },
    stationName: {
        japanese: "品川",
        english: "Shinagawa",
        kana: "しながわ",
        chinese: "品川",
        korean: "시나가와",
        tlc: "SGW",
        numberings: [{ number: "JY25", color: "#B2CC36" }]
    },
    leftStation1: {
        go: true,
        directionColor: "#008803",
        name: {
            japanese: "高輪ゲートウェイ",
            english: "Takanawa-Gateway"
        },
        numberings: [{ number: "JY26", color: "#B2CC36" }]
    },
    leftStation2: {
        enable: false,
        go: true,
        directionColor: "#008803",
        name: {
            japanese: "田町",
            english: "Tamachi"
        },
        numberings: [{ number: "JY27", color: "#B2CC36" }]
    },
    rightStation1: {
        go: true,
        directionColor: "#008803",
        name: {
            japanese: "大崎",
            english: "Ōsaki"
        },
        numberings: [{ number: "JY24", color: "#B2CC36" }]
    },
    rightStation2: {
        enable: false,
        go: true,
        directionColor: "#008803",
        name: {
            japanese: "大井町",
            english: "Ōimachi"
        },
        numberings: [{ number: "JK19", color: "#1DAED1" }]
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
