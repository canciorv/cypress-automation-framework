/// <reference types = "Cypress" />
"use strict";

describe("Test File Upload via webdriveruni", () => {
  it("Upload a file....", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#file-upload")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.fixture("test.png", "base64").then((fileContent) => {
      cy.get("#myFile").attachFile(
        {
          fileContent,
          fileName: "test.png",
          mimeType: "image/png",
        },
        {
          uploadType: "input",
        }
      );
    });
    cy.get("#submit-button").click();
  });

  it("Upload no file....", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#file-upload")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#submit-button").click();
  });
});
