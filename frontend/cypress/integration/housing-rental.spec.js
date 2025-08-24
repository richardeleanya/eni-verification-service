describe('Housing & Rental Workbench', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/integrations/housing-rental', { fixture: 'housing-rental.json' }).as('getHousingRentalRecords');
    cy.intercept('POST', '/api/integrations/housing-rental/1/verify', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: 1,
          tenantName: "John Doe",
          propertyAddress: "123 Main St, Anytown, USA",
          leaseStartDate: "2023-01-01",
          leaseEndDate: "2023-12-31",
          rentAmount: 1200.00,
          verificationStatus: "VERIFIED",
          submittedAt: "2023-01-15T10:00:00Z",
          verifiedAt: new Date().toISOString(),
          createdBy: "user",
          createdAt: "2023-01-15T10:00:00Z",
          updatedBy: "user",
          updatedAt: new Date().toISOString()
        }
      });
    }).as('verifyHousingRentalRecord');

    cy.visit('/housing-rental/workbench');
    cy.wait('@getHousingRentalRecords');
  });

  it('should display the housing & rental records table', () => {
    cy.get('h1').should('contain', 'Housing & Rental Workbench');
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length', 2);
  });

  it('should display the details of a record when a row is clicked', () => {
    cy.get('tbody tr:first-child').click();
    cy.get('.chakra-card-header').should('contain', 'John Doe');
    cy.get('.chakra-card-body').should('contain', '123 Main St');
  });

  it('should verify a record when the verify button is clicked', () => {
    cy.get('tbody tr:first-child .chakra-button').click();
    cy.wait('@verifyHousingRentalRecord');
    cy.get('tbody tr:first-child').should('contain', 'VERIFIED');
  });
});
