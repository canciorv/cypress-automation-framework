/// <reference types = "Cypress" />
"use strict";

describe("Verify automcomplete dropdown lists via webdriveruni", () => {
  it("Select specific product via autocomplete list", () => {
    cy.visit("/");
    cy.get("#autocomplete-textfield")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#myInput").type("A");

    cy.get("#myInputautocomplete-list > *")
      .each(($el, index, $list) => {
        const prod = $el.text();
        const productToSelect = "Avacado";

        if (prod === productToSelect) {
          //   $el.click();
          $el.trigger("click");

          cy.get("#submit-button").click();
          cy.url().should("include", productToSelect);
        }
      })
      .then(() => {
        cy.get("#myInput").type("g");

        cy.get("#myInputautocomplete-list > *").each(($el, index, $list) => {
          const prod2 = $el.text();
          const productToSelect2 = "Grapes";

          if (prod2 === productToSelect2) {
            // $el.click();
            $el.trigger("click");

            cy.get("#submit-button").click();
            cy.url().should("include", productToSelect2);
          }
        });
      });
  });
});
