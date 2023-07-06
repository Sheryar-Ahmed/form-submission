const validator = require("email-validator");
const { firefox } = require("playwright");
const sendEmail = require('../utils/sendEmail');


const refinanceController = async (req, res) => {

  if (validator.validate(req.body.email)) {
    try {

      const email = req.body.email;
      const full_name = req.body.full_name;
      const phone = req.body.phone;
      const transaction = req.body.transaction;
      const property_type = req.body.property_type;
      const credit_score = req.body.credit_score;
      const property_usage = req.body.property_usage;
      const home_value = req.body.home_value;
      const rate_type = req.body.rate_type;
      const total_annual_income = req.body.total_annual_income;
      const employement_status = req.body.employement_status;
      const bankruptcy = req.body.bankruptcy;
      const income_proof = req.body.income_proof;
      const zipCode = req.body.zipCode;
      const mortgage = req.body.mortgage;
      const interest_rate = req.body.interest_rate;
      const second_mortgage = req.body.second_mortgage;
      const add_cash = req.body.add_cash;
      const fha_loan = req.body.fha_loan;
      const purchasing_year = req.body.purchasing_year;
      //send email
      const html = `
          <h1>Data entered by: ${email} is following</h1>
          <p>Name: ${req.body.full_name}</p>
          <p>Email: ${req.body.email}</p>
          <p>Number: ${req.body.phone}</p>
          <p>Zip Code: ${req.body.zipCode}</p>
          <p>Home Type: ${req.body.transaction}</p>
          <p>Property Type: ${req.body.property_type}</p>
          <p>Credit Score: ${req.body.credit_score}</p>
          <p>First Purchase Year: ${req.body.purchasing_year}</p>
          <p>Property Value: ${req.body.home_value}</p>
          <p>1st Remaining Mortage: ${req.body.interest_rate}</p>
          <p>Mortage Interest Rate: ${req.body.second_mortgage}</p>
          <p>Property Used: ${req.body.property_usage}</p>
          <p>Kind of Rate: ${req.body.rate_type}</p>
          <p>Is this 2nd mortage: ${req.body.mortgage}</p>
          <p>Additional Cash: ${req.body.add_cash}</p>
          <p>Employement Status: ${req.body.employement_status}</p>
          <p>Bankruptcy, short sale, or foreclosure in the last 3 years?: ${req.body.bankruptcy}</p>
          <p>Income Proof: ${req.body.income_proof}</p>
          <p>Monthly Income: ${req.body.total_annual_income}</p>
          <p>FHA Loan: ${req.body.fha_loan}</p>
      `
      await sendEmail('Account data entered by email:' + email, html);
      //form fillation
      const browser = await firefox.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('https://api.clixlo.com/widget/form/d8K0IpsJGdtuVyErO1TR');
      
      await page.fill('input[name="full_name"]', full_name);
      await page.fill('input[name="phone"]', phone);
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="qpMmLQm5DIOG2Ux7PcnB"]', transaction);
      await page.fill('input[name="CmdqKuXjIQUNz0Ef1B7J"]', property_type);
      await page.fill('input[name="torHEECUN1qlAyUsipKu"]', credit_score);
      await page.fill('input[name="eMy2OcvQcUN0rTNq22Zx"]', property_usage);
      await page.fill('input[name="KW1REyBPr6aJAnGnv0Yu"]', home_value);
      await page.fill('input[name="OSJ3HwhimgAP0jOAmFz6"]', rate_type);
      await page.fill('input[name="3smlXpSpopER87L2V9rQ"]', total_annual_income);
      await page.fill('input[name="aLgVGNkHkz9xE9wbmXVH"]', employement_status);
      await page.fill('input[name="MJO6lINsXTRE2Mne6awc"]', bankruptcy);
      await page.fill('input[name="DZ9qywLxPY1n7Nff5HnI"]', income_proof);
      await page.fill('input[name="hNn06S0mTBWBv4b5xE0N"]', zipCode);
      await page.fill('input[name="ke9jHqOsNFGrL7xMIwqd"]', mortgage);
      await page.fill('input[name="liwo67H5BHQhwzQ6Cr4c"]', interest_rate);
      await page.fill('input[name="iS3XKEg0Hhi8W4amOw9s"]', second_mortgage);
      const addCashValue = Number(add_cash) || 0; // Convert add_cash to a number, defaulting to 0 if it's not a valid number
      await page.fill('input[name="L6lMyRr7u3GFlq1CQU20"]', addCashValue.toString());
      await page.fill('input[name="kAZsP7vDGqXjewCYV7OB"]', fha_loan);
      await page.fill('input[name="PixfrmVegThu1SMyAohb"]', purchasing_year);
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
    }
  } else {
    res.status(422).json({
      message: "Invalid Email."
    });
  }
};

module.exports = { refinanceController };
