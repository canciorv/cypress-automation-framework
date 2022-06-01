import AutoStore_Homepage_PO from "../../support/pageObjects/automation-test-store/AutoStore_Homepage_PO";
import AutoStore_HairCare_PO from "../../support/pageObjects/automation-test-store/AutoStore_HairCare_PO";
/// <reference types = "Cypress" />
("use strict");

describe("Add multiple items to the basket", () => {
  const autoStore_homepage_PO = new AutoStore_Homepage_PO();
  const autoStore_haircare_PO = new AutoStore_HairCare_PO();

  before(() => {
    cy.fixture("products").then((data) => {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    autoStore_homepage_PO.accessHomepage();
    autoStore_homepage_PO.clickOn_HairCare_Link();
  });

  it("Add specific items to basket", () => {
    // cy.addProduct_To_Cart(data.productName[0]);
    // cy.addProduct_To_Cart(data.productName[1]);
    // cy.addProduct_To_Cart(data.productName[2]); OR
    autoStore_haircare_PO.addHairCareProductsToBasket();
  });
});
