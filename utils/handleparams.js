const messages = require("./messages")
const urlRegex = require("url-regex")
const parseBoolean = require('./parseboolean');


module.exports = (params) => {

    const { url, selector, width = 1366, height = 768, format = "png", padding = 0, selectorToBeDeleted = '' } = params

    params.isCloudUpload = parseBoolean(params.isCloudUpload)

    if (!url) return {
        error: true,
        message: messages.REQUIRED_URL_MESSAGE
    }
    if (!selector) return {
        error: true,
        message: messages.REQUIRED_SELECTOR_MESSAGE
    }
    if (!urlRegex({ exact: true, strict: false }).test(url)) {
        return {
            error: true,
            message: messages.VALIDATION_URL_MESSAGE
        }
    }
    if (!(format === "png" || format === "jpeg")) {
        return {
            error: true,
            message: messages.VALIDATION_FORMAT_MESSAGE
        }
    }
    if (isNaN(+width) || isNaN(+height)) {
        return {
            error: true,
            message: messages.VALIDATION_NAN_MESSAGE
        }
    }
    return {
        error: false,
        message: "Success",
        params: {
            url,
            selector,
            width: +width,
            height: + height,
            format,
            padding,
            isCloudUpload: params.isCloudUpload,
            selectorToBeDeleted
        }
    }
}
