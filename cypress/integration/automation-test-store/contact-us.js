/// <reference types = "Cypress" />
"use strict";

describe("Test Contact Us form via Automation Test Store", () => {
  before(() => {
    // cy.viewport(550, 750);
    cy.fixture("userDetails").as("user");
  });

  it("Should be able to submit a successful submission via contact us form", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get("a[href$='contact']")
      .contains("Contact Us")
      .click()
      .then(function (linkText) {
        cy.log("Clicked Link Footer text: " + linkText.text());
      });
    // cy.xpath("//a[contains(@href, 'contact')]").click();
    cy.get("@user").then((user) => {
      cy.get("#ContactUsFrm_first_name").type(user.first_name);
      cy.get("#ContactUsFrm_email").type(user.email);
    });
    cy.get("#ContactUsFrm_email").should("have.attr", "name", "email");
    cy.get("[id='ContactUsFrm_enquiry']").type("Test enquiry");
    cy.get("button[title='Submit']").click();
    cy.xpath(
      "//p[contains(text(), 'Your enquiry has been successfully sent to the store owner!')]"
    ).should(
      "have.text",
      "Your enquiry has been successfully sent to the store owner!"
    );
    cy.log("Test has completed!");
  });
});
