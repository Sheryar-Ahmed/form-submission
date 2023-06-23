const validator = require("email-validator");
const { firefox } = require("playwright");

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


        try {
            const browser = await firefox.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto('https://api.clixlo.com/widget/form/wMbKwQ0BfkLFQQcClrvG', { waitUntil: 'domcontentloaded' });

            await page.fill('input[name="full_name"]', String(full_name));
            await page.fill('input[name="phone"]', String(phone));
            await page.fill('input[name="email"]', String(email));
            await page.fill('input[name="qpMmLQm5DIOG2Ux7PcnB"]', String(transaction));
            await page.fill('input[name="CmdqKuXjIQUNz0Ef1B7J"]', String(property_type));
            await page.fill('input[name="torHEECUN1qlAyUsipKu"]', String(credit_score));
            await page.fill('input[name="eIz7EOmjQrvey8Yc8Yl6"]', String(first_purchase));
            await page.fill('input[name="k7q4iRH1jmPv9jjAvL7e"]', String(purchase_stage));
            await page.fill('input[name="eMy2OcvQcUN0rTNq22Zx"]', String(property_usage));
            await page.fill('input[name="KW1REyBPr6aJAnGnv0Yu"]', String(home_value));
            await page.fill('input[name="9NqRYFP1jMeDNqARqEcp"]', String(downpayment_percentage));
            await page.fill('input[name="OSJ3HwhimgAP0jOAmFz6"]', String(rate_type));
            await page.fill('input[name="3smlXpSpopER87L2V9rQ"]', String(total_annual_income));
            await page.fill('input[name="aLgVGNkHkz9xE9wbmXVH"]', String(employement_status));
            await page.fill('input[name="MJO6lINsXTRE2Mne6awc"]', String(bankruptcy));
            await page.fill('input[name="DZ9qywLxPY1n7Nff5HnI"]', String(income_proof));
            await page.fill('input[name="RZ34IPZhXGA8Z8pxkGXK"]', String(realEstate_agent));
            await page.fill('input[name="hNn06S0mTBWBv4b5xE0N"]', String(zipCode));

            await page.waitForSelector('button');

            await page.click('button[type="submit"]');
            await page.waitForNavigation();

            await browser.close();

            res.status(200).json({
                message: "Form Submitted Successfully."
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error occurred during form submission."
            });
        };
        
    } else {
        res.status(422).json({
            message: "InValid Email."
        });
    }
};


module.exports = { formController };