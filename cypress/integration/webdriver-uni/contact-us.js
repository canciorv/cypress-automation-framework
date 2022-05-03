import HomePage_PO from "../../support/pageObjects/webdriver-uni/Homepage_PO";
import Contact_Us_PO from "../../support/pageObjects/webdriver-uni/Contact_Us_PO";
/// <reference types = "Cypress" />
("use strict");

describe("Test Contact Us form via WebDriverUni", () => {
  Cypress.config("defaultCommandTimeout", 20000);
  const homepage_PO = new HomePage_PO();
  const contact_us_PO = new Contact_Us_PO();

  before(() => {
    cy.fixture("example").then((data) => {
      // this.data = data;
      globalThis.data = data; // if problems have occurred
    });
  });

  beforeEach(() => {
    homepage_PO.visitHomePage();
    cy.wait(3000);
    homepage_PO.clickOn_ContactUs_Button();
    // cy.pause();
  });

  it("Should be able to submit a successful submission via contact us form", () => {
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.title().should("include", "WebDriver | Contact Us");
    cy.url().should("include", "/contactus");

    contact_us_PO.contactForm_Submission(
      Cypress.env("first_name"),
      data.last_name,
      data.email,
      "Test Comment only",
      "h1",
      "Thank You for your Message!"
    );
  });

  it("Should not be able to submit a successful submission via contact us form as all field are required", () => {
    if (Cypress.isBrowser("firefox")) {
    } else {
      contact_us_PO.contactForm_Submission(
        data.first_name,
        data.last_name,
        " ",
        "Test Comment only",
        "body",
        "Error: Invalid email address"
      );
    }
  });
});
