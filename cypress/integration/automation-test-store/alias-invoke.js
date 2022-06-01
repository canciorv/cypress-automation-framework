/// <reference types = "Cypress" />
"use strict";

describe("Alias and Invoke", () => {
  it("Validate a specific hair care product", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();

    cy.get(".fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");

    cy.get("@productThumbnail").its("length").should("be.gt", 5);
    cy.get("@productThumbnail").should("eq", "Seaweed Conditioner");
  });

  it("Validate product thumbnail", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnails");
    cy.get("@productThumbnails").should("have.length", 16);
    cy.get("@productThumbnails")
      .find(".productcart")
      .invoke("attr", "title")
      .should("include", "Add to Cart");
  });
  it("Calculate total of normal and sale products", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnails");
    // cy.get("@productThumbnails")
    //   .find(".oneprice")
    //   .each(($el, index, $list) => {
    //     cy.log($el.text());
    //   });
    cy.get(".thumbnail").find(".oneprice").invoke("text").as("itemPrice");
    cy.get(".thumbnail").find(".pricenew").invoke("text").as("saleItemPrice");

    let itemsTotal = 0;
    cy.get("@itemPrice").then((linkText) => {
      const itemPrice = linkText.split("$");
      let sum = 0;
      for (let i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        sum += Number(itemPrice[i]);
      }
      itemsTotal += sum;
      cy.log(`Non sale price items total: ${sum}`);
    });

    cy.get("@saleItemPrice")
      .then((linkText) => {
        const saleItemPrice = linkText.split("$");
        let sum = 0;
        for (let i = 0; i < saleItemPrice.length; i++) {
          cy.log(saleItemPrice[i]);
          sum += Number(saleItemPrice[i]);
        }
        itemsTotal += sum;
        cy.log(`Sale price items total: ${sum}`);
      })
      .then(() => {
        cy.log(`The total price of all products ${itemsTotal}`);
        expect(itemsTotal).to.equal(648.5);
      });
  });
});
