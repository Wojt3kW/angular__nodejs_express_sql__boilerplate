const utils = require("./object-utils");
const httpCodes = require("../utils/httpCodes");

function getStatus(response) {
    if (utils.isObjectWithStatus(response)) {
        return response.status;
    }

    return httpCodes.success;
}

function getResult(response) {
    if (!utils.isObjectWithStatus(response)) {
        return response;
    }

    if (utils.isObjectWithError(response)) {
        return {
            status: httpCodes.serverError,
            error: response.error?.name || response.error
        };
    }

    return {
        status: getStatus(response),
        message: utils.isObjectWithMessage(response) ? response.message : null,
        data: utils.isObjectWithData(response) ? response.data : null,
    };
}

module.exports = {
    getStatus: getStatus,
    getResult: getResult,
}