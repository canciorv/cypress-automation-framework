class AutoStore_HairCare_PO {
  addHairCareProductsToBasket() {
    globalThis.data.productName.forEach(function (element) {
      cy.addProduct_To_Cart(element).then(() => {
        // debugger;
      });
    });
    cy.get(".dropdown-toggle > .fa").click();
  }
}
export default AutoStore_HairCare_PO;
