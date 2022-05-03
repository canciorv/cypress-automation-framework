/// <reference types = "Cypress" />
"use strict";

describe("Verifying checkboxes via webdriveruni", () => {
  beforeEach(() => {
    cy.log(Cypress.env("name"));
    cy.navigateTo_WebdriverUni_Checkbox_Page();
  });

  it("Check and validate checkbox", () => {
    // cy.get("[value='option-1']").check();
    // cy.get("[value='option-1']").check().should("be.checked");

    cy.get("[value='option-1']").as("option-1");
    // cy.get("@option-1").check();
    cy.get("@option-1").check().should("be.checked");
  });

  it("Uncheck and validate checkbox", () => {
    cy.get("[value='option-3']").as("option-3");
    cy.get("@option-3")
      .uncheck()
      .then(() => {
        cy.get("@option-3").should("not.be.checked");
      });
  });

  it("Check multiple checkboxes", () => {
    cy.get("input[type='checkbox']")
      .check(["option-1", "option-2", "option-3", "option-4"])
      .should("be.checked");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Click on all Radio Buttons', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[value="green"]').check();
    cy.get('[value="blue"]').check();
    cy.get('[value="yellow"]').check();
    cy.get('#radio-buttons > [value="orange"]').check();
    cy.get('[value="purple"]').check();
    /* ==== End Cypress Studio ==== */
  });
});
