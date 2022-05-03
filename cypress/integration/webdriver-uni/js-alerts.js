/// <reference types = "Cypress" />
"use strict";

describe("Handle js alerts", () => {
  it("Confirm js alert contains the correct text", () => {
    //cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#button1").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("I am an alert box!");
    });
  });

  it("Validate javascript confirm alert box works correctly when clicking ok", () => {
    //cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#button4").click();

    cy.on("window:confirm", (str) => {
      return true; // true clicks "OK" | false clicks "Cancel"
    });
    cy.get("#confirm-alert-text").contains("You pressed OK!");
  });

  it("Validate js confirm alert box", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#button4").click();

    cy.on("window:confirm", (str) => {
      return false; // true clicks "OK" | false clicks "Cancel"
    });
    cy.get("#confirm-alert-text").contains("You pressed Cancel!");
  });

  it.only("Validate js confirm alert box using a stub", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });

    const stub = cy.stub();
    cy.on("window:confirm", stub);

    cy.get("#button4")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Press a button!");
      })
      .then(() => {
        return true;
      })
      .then(() => {
        cy.get("#confirm-alert-text").contains("You pressed OK!");
      });
  });
});
