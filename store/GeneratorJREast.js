export const state = () => ({
    housing: {
        type: "se-led",
        width: 1900,
        height: 600,
        padding: 35,
        lighting: false
    }
});

export const getters = {
    panelArea: state => {
        const { width, height } = state.housing;
        switch (state.housing.type) {
            case "se-led":
                return {
                    x: state.housing.padding,
                    y: 80,
                    width: width - state.housing.padding * 2,
                    height: height - 110
                };
            case "b-fl":
                return {
                    x: 15,
                    y: 15,
                    width: width - 30,
                    height: height - 45
                };
            case "non-light":
                return {
                    x: 15,
                    y: 15,
                    width: width - 30,
                    height: height - 30
                };
            default:
                return {
                    x: 0,
                    y: 0,
                    width: state.housing.width,
                    height: state.housing.height
                };
        }
    }
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
