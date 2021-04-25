const messages = require("./messages")
const urlRegex = require("url-regex")
const parseBoolean = require('./parseboolean');


module.exports = (params) => {

    const { url, selector, width = 1000, height = 600, format = "png", padding = 0, isCloudUpload = false, selectorToBeDeleted = '' } = params

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
    if (format !== "png" || format !== "png") {
        return {
            error: true,
            message: messages.VALIDATION_FORMAT_MESSAGE
        }
    }
    return {
        error: false,
        message: "Success",
        params: {
            url,
            selector,
            width,
            height,
            format,
            padding,
            isCloudUpload,
            selectorToBeDeleted
        }
    }
}
