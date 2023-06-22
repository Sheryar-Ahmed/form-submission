const validator = require("email-validator");
const puppeteer = require('puppeteer');

const formController = async (req, res) => {
    const {
        full_name,
        phone,
        email,
        transaction,
        property_type,
        credit_score,
        first_purchase,
        purchase_stage,
        property_usage,
        home_value,
        downpayment_percentage,
        rate_type,
        total_annual_income,
        employement_status,
        bankruptcy,
        income_proof,
        realEstate_agent,
        zipCode
    } = req.body;

    if (validator.validate(email)) {

        (async () => {
            const browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            // Navigate to the webpage containing the form
            await page.goto('https://api.clixlo.com/widget/form/wMbKwQ0BfkLFQQcClrvG', { waitUntil: 'domcontentloaded' });
            // Fill in the form fields as Needed
            await page.type('input[name="full_name"]', String(full_name));
            await page.type('input[name="phone"]', String(phone));
            await page.type('input[name="email"]', String(email));
            await page.type('input[name="qpMmLQm5DIOG2Ux7PcnB"]', String(transaction));
            await page.type('input[name="CmdqKuXjIQUNz0Ef1B7J"]', String(property_type));
            await page.type('input[name="torHEECUN1qlAyUsipKu"]', String(credit_score));
            await page.type('input[name="eIz7EOmjQrvey8Yc8Yl6"]', String(first_purchase));
            await page.type('input[name="k7q4iRH1jmPv9jjAvL7e"]', String(purchase_stage));
            await page.type('input[name="eMy2OcvQcUN0rTNq22Zx"]', String(property_usage));
            await page.type('input[name="KW1REyBPr6aJAnGnv0Yu"]', String(home_value));
            await page.type('input[name="9NqRYFP1jMeDNqARqEcp"]', String(downpayment_percentage));
            await page.type('input[name="OSJ3HwhimgAP0jOAmFz6"]', String(rate_type));
            await page.type('input[name="3smlXpSpopER87L2V9rQ"]', String(total_annual_income));
            await page.type('input[name="aLgVGNkHkz9xE9wbmXVH"]', String(employement_status));
            await page.type('input[name="MJO6lINsXTRE2Mne6awc"]', String(bankruptcy));
            await page.type('input[name="DZ9qywLxPY1n7Nff5HnI"]', String(income_proof));
            await page.type('input[name="RZ34IPZhXGA8Z8pxkGXK"]', String(realEstate_agent));
            await page.type('input[name="hNn06S0mTBWBv4b5xE0N"]', String(zipCode));
            // Submit the form
            // Wait for the button to become visible and clickable
            await page.waitForSelector('button');

            // Click on the button
            await page.click('button');

            // Wait for navigation to complete
            await page.waitForNavigation();

            // Close the browser
            await browser.close();
            res.status(200).json({
                message: "Form Submitted Successfully."
            });


        })();
    } else {
        res.status(422).json({
            message: "InValid Email."
        });
    }
};


module.exports = { formController };