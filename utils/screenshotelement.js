const messages = require("./messages")

/**
    * Takes a screenshot of a DOM element on the page
    *
    * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
    * @return {!Promise<!Buffer>}
    */


module.exports = async (opts = {}, page) => {

    const { padding = 0, type, selector, selectorToBeDeleted, isCloudUpload } = opts;

    const rect = await page.evaluate((selector, selectorToBeDeleted, messages) => {
        const element = document.querySelector(selector);
        if (!element)
            return {
                error: true,
                message: `${messages.ELEMENT_NOTFOUND_MESSAGE} ${selector}`
            };
        if (selectorToBeDeleted) {
            const elementToBeDeleted = document.querySelector(selectorToBeDeleted)
            if (!elementToBeDeleted) return {
                error: true,
                message: `${messages.ELEMENT_NOTFOUND_MESSAGE} ${selectorToBeDeleted}`
            };
            elementToBeDeleted ? elementToBeDeleted.remove() : null
        }
        const { x, y, width, height } = element.getBoundingClientRect();
        return { error: false, left: x, top: y, width, height, id: element.id };
    }, selector, selectorToBeDeleted, messages);

    if (rect.error)
        throw Error(rect.message);
    return await page.screenshot({
        type,
        encoding: isCloudUpload ? "binary" : "base64",
        clip: {
            x: rect.left - padding,
            y: rect.top - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2
        }
    });
}