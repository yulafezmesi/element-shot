const express = require('express')
const puppeteer = require('puppeteer');
const { screenshotDOMElement, queryParamsHandler } = require('../utils/index')
const { uploadToCloudinary } = require('../services/cloudinary')
const indexRoute = express.Router();

/**
 * 
* @api {get} /api Get Screenshot from element
* @apiName Screenshot
*
* @apiParam  {String} [url] Url
* @apiParam  {String} [selector] Selector
* @apiParam  {Number} [width(default: 1366)] Screenshot width
* @apiParam  {Number} [height(default: 768)] Screenshot height
* @apiParam  {Number} [padding(default: 0)] Padding for screenshot
* @apiParam  {String} [format(default: png)] Screenshot return format. Available png || jpeg
*
*/

indexRoute.get('/', async (req, res) => {

    const { error, message, params } = queryParamsHandler(req.query);

    if (error) {
        return res.status(500).send({
            error: true,
            message
        })
    }

    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox']);
        const page = await browser.newPage();
        // Adjustments particular to this page to ensure we hit desktop breakpoint.
        page.setViewport({ width: +params.width, height: +params.height, deviceScaleFactor: 1 });

        await page.goto(params.url, { waitUntil: 'networkidle2' });

        const image = await screenshotDOMElement({
            selector: params.selector,
            isCloudUpload: params.isCloudUpload,
            selectorToBeDeleted: params.selectorToBeDeleted,
            padding: params.padding,
        }, page);

        const data = params.isCloudUpload ? await uploadToCloudinary(image, params.format) : image

        res.send({
            success: true,
            data
        })

        browser.close();

    } catch (e) {
        res.status(500).send({ success: false, message: e.message })
    }
})

module.exports = indexRoute





