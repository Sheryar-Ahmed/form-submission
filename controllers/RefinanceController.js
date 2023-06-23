const validator = require("email-validator");
const axios = require("axios");
const { JSDOM } = require("jsdom");

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
      // Create a virtual DOM using JSDOM
      const dom = new JSDOM();
      const { document } = dom.window;

      // Simulate asynchronous operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate form submission by creating form elements and setting their values
      const form = document.createElement("form");
      form.action = "https://api.clixlo.com/widget/form/d8K0IpsJGdtuVyErO1TR";
      form.method = "POST";

      const createAndSetInputValue = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      createAndSetInputValue("full_name", full_name);
      createAndSetInputValue("phone", phone);
      createAndSetInputValue("email", email);
      createAndSetInputValue("qpMmLQm5DIOG2Ux7PcnB", transaction);
      createAndSetInputValue("CmdqKuXjIQUNz0Ef1B7J", property_type);
      createAndSetInputValue("torHEECUN1qlAyUsipKu", credit_score);
      createAndSetInputValue("eMy2OcvQcUN0rTNq22Zx", property_usage);
      createAndSetInputValue("KW1REyBPr6aJAnGnv0Yu", home_value);
      createAndSetInputValue("OSJ3HwhimgAP0jOAmFz6", rate_type);
      createAndSetInputValue("3smlXpSpopER87L2V9rQ", total_annual_income);
      createAndSetInputValue("aLgVGNkHkz9xE9wbmXVH", employement_status);
      createAndSetInputValue("MJO6lINsXTRE2Mne6awc", bankruptcy);
      createAndSetInputValue("DZ9qywLxPY1n7Nff5HnI", income_proof);
      createAndSetInputValue("hNn06S0mTBWBv4b5xE0N", zipCode);
      createAndSetInputValue("ke9jHqOsNFGrL7xMIwqd", mortgage);
      createAndSetInputValue("liwo67H5BHQhwzQ6Cr4c", interest_rate);
      createAndSetInputValue("iS3XKEg0Hhi8W4amOw9s", second_mortgage);
      createAndSetInputValue("L6lMyRr7u3GFlq1CQU20", add_cash);
      createAndSetInputValue("kAZsP7vDGqXjewCYV7OB", fha_loan);
      createAndSetInputValue("PixfrmVegThu1SMyAohb", purchasing_year);

      // Append the form to the document and submit it
      document.body.appendChild(form);

      // Simulate a response after form submission
      setTimeout(() => {
        res.status(200).json({
          message: "Form Submitted Successfully."
        });
      }, 1000); // Simulating a 1-second delay before the response
    } catch (error) {
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
