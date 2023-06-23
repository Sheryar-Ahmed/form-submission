const validator = require("email-validator");
const { firefox } = require("playwright");

const refinanceController = async (req, res) => {
  const {
    full_name,
    phone,
    email,
    transaction,
    property_type,
    credit_score,
    property_usage,
    home_value,
    rate_type,
    total_annual_income,
    employement_status,
    bankruptcy,
    income_proof,
    zipCode,
    mortgage,
    interest_rate,
    second_mortgage,
    add_cash,
    fha_loan,
    purchasing_year
  } = req.body;

  if (validator.validate(email)) {
    try {
      const browser = await firefox.launch({ headless: true });
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
