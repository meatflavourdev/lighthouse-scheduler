beforeEach(() => {
  cy.visit('/api/debug/reset')
})

describe("Appointments", () => {
  it("should book an interview", () => {
    // Visits the root of our web server
    cy.visit("/").contains("Monday");
    // Clicks on the "Add" button in the second appointment
    cy.get("[data-testid=applist] > article").eq(1).find("img").click();
    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Jeremy Dombrowski");
    // Chooses an interviewer
    cy.get("[data-testid=intlist] > li").eq(1).click();
    // Clicks the save button
    cy.get("button").contains("Save").click();
    // Sees the booked appointment
    cy.get("[data-testid=applist] > article").eq(1).contains('Jeremy Dombrowski');
    cy.get("[data-testid=applist] > article").eq(1).contains('Tori Malcolm');
  });

  it("should edit an interview", () => {
    // Visits the root of our web server
    cy.visit("/").contains("Monday");
    // Clicks the edit button for the existing appointment
    cy.get("[data-testid=applist] > article").eq(0).get('img[alt="Edit"]').click();
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Jeremy Dombrowski");
    cy.get("[data-testid=intlist] > li").eq(1).click();
    // Clicks the save button
    cy.get("button").contains("Save").click();
    // Sees the edit to the appointment
    cy.get("[data-testid=applist] > article").eq(0).contains('Jeremy Dombrowski');
    cy.get("[data-testid=applist] > article").eq(0).contains('Tori Malcolm');
  });

  it("should cancel an interview", () => {
    // Visits the root of our web server
    cy.visit("/").contains("Monday");
    // Clicks the delete button for the existing appointment
    cy.get("[data-testid=applist] > article").eq(0).get('img[alt="Delete"]').click();
    // Clicks the confirm button
    cy.get("button").contains("Confirm").click();
    // Sees that the appointment slot is empty
    cy.get("[data-testid=applist] > article").eq(0).find("img[alt=Add]")
  });
});
