const validator = require("email-validator");
const playwright = require("playwright-core");
const chromium = require("chrome-aws-lambda");

const checkBrowserAvailability = async () => {
    try {
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
          });          
  
      console.log("Browser is available");
      await browser.close();
    } catch (error) {
      console.error("Browser is not available:", error);
    }
  };
  
  
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
      employment_status,
      bankruptcy,
      income_proof,
      zipCode,
      mortgage,
      interest_rate,
      second_mortgage,
      add_cash,
      fha_loan,
      purchasing_year,
    } = req.body;
  
    if (validator.validate(email)) {
      try {
        await checkBrowserAvailability();
  
        const browser = await playwright.chromium.launch();

  
        const context = await browser.newContext();
        const page = await context.newPage();
  
        await page.goto("https://api.clixlo.com/widget/form/d8K0IpsJGdtuVyErO1TR");
  
        // Rest of your code...
  
        await browser.close();
  
        res.status(200).json({
          message: "Form Submitted Successfully.",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error occurred during form submission.",
        });
      }
    } else {
      res.status(422).json({
        message: "Invalid Email.",
      });
    }
  };
  
  module.exports = { refinanceController };
  