/// <reference types="Cypress" />

describe("Handling data via webdriveruni", () => {
  beforeEach(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
  });
  it("Calculate the and assert the total age of all users", () => {
    let userDetails = [];
    let num = 0;
    cy.get("#thumbnail-1 td")
      .each(($el, index, $list) => {
        userDetails[index] = $el.text();
      })
      .then(() => {
        for (let i = 0; i < userDetails.length; i++) {
          if (Number(userDetails[i])) {
            num += Number(userDetails[i]);
          }
          //   cy.log(userDetails[i]);
        }
        cy.log(`Found total age: ${num}`);
        expect(num).to.eql(322);
      });
  });

  it("Calculate the and assert the age of a given user based on last name", () => {
    cy.get("#thumbnail-1  tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Woods")) {
        cy.get("#thumbnail-1  tr td:nth-child(2)")
          .eq(index)
          .next()
          .then((age) => {
            const userAge = age.text();
            expect(userAge).to.eql("80");
          });
      }
    });
  });

  // it("Calculate the and assert the age of a given user based on last name", () => {
  //   let lastName = [];
  //   let age = [];
  //   cy.get("#thumbnail-1  tr td:nth-child(2)")
  //     .each(($el, index, $list) => {
  //       lastName[index] = $el.text();
  //     })
  //     .then(() => {
  //       for (let i = 0; i < lastName.length; i++) {
  //         return lastName[i];
  //       }
  //     });

  //   cy.get("#thumbnail-1  tr td:nth-child(3)")
  //     .each(($el, index, $list) => {
  //       age[index] = $el.text();
  //     })
  //     .then(() => {
  //       for (let i = 0; i < age.length; i++) {
  //         return age[i];
  //       }
  //     });
  // });
});
