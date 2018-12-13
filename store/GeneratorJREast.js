export const state = () => ({
    housing: {
        type: "b-fl",
        width: 1900,
        height: 600,
        padding: 35,
        lighting: false
    }
});

export const getters = {
    panelArea: state => {
        switch (state.housing.type) {
            case "se-led":
                return {
                    x: state.housing.padding,
                    y: 80,
                    width: state.housing.width - state.housing.padding * 2,
                    height: state.housing.height - 110
                };
            case "b-fl":
                return {
                    x: 15,
                    y: 15,
                    width: state.housing.width - 30,
                    height: state.housing.height - 45
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
