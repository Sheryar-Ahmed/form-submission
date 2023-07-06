const validator = require("email-validator");
const { firefox } = require("playwright");
const sendEmail  = require('../utils/sendEmail');

const formController = async (req, res) => {

    if (validator.validate(req.body.email)) {

        try {
            //send email
            const email = req.body.email;
            const full_name = req.body.full_name;
            const phone = req.body.phone;
            const transaction = req.body.transaction;
            const property_type = req.body.property_type;
            const credit_score = req.body.credit_score;
            const first_purchase = req.body.first_purchase;
            const purchase_stage = req.body.purchase_stage;
            const property_usage = req.body.property_usage;
            const home_value = req.body.home_value;
            const downpayment_percentage = req.body.downpayment_percentage;
            const rate_type = req.body.rate_type;
            const total_annual_income = req.body.total_annual_income;
            const employement_status = req.body.employement_status
            const bankruptcy = req.body.bankruptcy;
            const income_proof = req.body.income_proof;
            const realEstate_agent = req.body.realEstate_agent;
            const zipCode = req.body.zipCode;
            const html = `
                <h1>Data entered by: ${email} is following</h1>
                <p>Name: ${req.body.full_name}</p>
                <p>Email: ${req.body.email}</p>
                <p>Number: ${req.body.phone}</p>
                <p>Zip Code: ${req.body.zipCode}</p>
                <p>Home Type: ${req.body.transaction}</p>
                <p>Property Type: ${req.body.property_type}</p>
                <p>Credit Score: ${req.body.credit_score}</p>
                <p>${req.body.full_name}'s first purchase: ${req.body.first_purchase}</p>
                <p>Current Situation: ${req.body.purchase_stage}</p>
                <p>Property Used: ${req.body.property_usage}</p>
                <p>Purchase Price: ${req.body.home_value}</p>
                <p>Down Payment: ${req.body.downpayment_percentage}</p>
                <p>Kind of Rate: ${req.body.rate_type}</p>
                <p>Household Income: ${req.body.total_annual_income}</p>
                <p>Employement Status: ${req.body.employement_status}</p>
                <p>Bankruptcy, short sale, or foreclosure in the last 3 years?: ${req.body.bankruptcy}</p>
                <p>Income Proof: ${req.body.income_proof}</p>
                <p>Agent Associated: ${req.body.realEstate_agent}</p>
            `
            await sendEmail('Account data entered by email:' + email, html);

            //form filling
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