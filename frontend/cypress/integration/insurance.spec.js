describe('Insurance Workbench', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/integrations/insurance', { fixture: 'insurance.json' }).as('getInsuranceRecords');
    cy.intercept('POST', '/api/integrations/insurance/1/verify', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: 1,
          policyHolderName: "John Doe",
          policyNumber: "POL-12345",
          policyType: "AUTO",
          coverageAmount: 50000.00,
          verificationStatus: "VERIFIED",
          submittedAt: "2023-01-15T10:00:00Z",
          verifiedAt: new Date().toISOString(),
          createdBy: "user",
          createdAt: "2023-01-15T10:00:00Z",
          updatedBy: "user",
          updatedAt: new Date().toISOString()
        }
      });
    }).as('verifyInsuranceRecord');

    cy.visit('/insurance/workbench');
    cy.wait('@getInsuranceRecords');
  });

  it('should display the insurance records table', () => {
    cy.get('h1').should('contain', 'Insurance Workbench');
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length', 2);
  });

  it('should display the details of a record when a row is clicked', () => {
    cy.get('tbody tr:first-child').click();
    cy.get('.chakra-card-header').should('contain', 'John Doe');
    cy.get('.chakra-card-body').should('contain', 'POL-12345');
  });

  it('should verify a record when the verify button is clicked', () => {
    cy.get('tbody tr:first-child .chakra-button').click();
    cy.wait('@verifyInsuranceRecord');
    cy.get('tbody tr:first-child').should('contain', 'VERIFIED');
  });
});
