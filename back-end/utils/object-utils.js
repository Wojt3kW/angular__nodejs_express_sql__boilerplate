function isObject(arg) {
    return (!!arg) && (arg.constructor === Object);
}

module.exports = {
    isObjectWithStatus: function (arg) {
        return isObject(arg) && Object.hasOwn(arg, 'status')
    },

    isObjectWithError: function (arg) {
        return isObject(arg) && Object.hasOwn(arg, 'error')
    },

    isObjectWithMessage: function (arg) {
        return isObject(arg) && Object.hasOwn(arg, 'message')
    },

    isObjectWithData: function (arg) {
        return isObject(arg) && Object.hasOwn(arg, 'data')
    },
}