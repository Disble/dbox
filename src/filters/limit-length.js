const limitLength = {};

function reduceLength(str) {
    return str.length > 30 ? str.subString(0, 29) : str;
}

limitLength.install = function (Vue) {
    Vue.filter('limit-length', (val) => {
        return reduceLength(val);
    });
}

export default limitLength;
