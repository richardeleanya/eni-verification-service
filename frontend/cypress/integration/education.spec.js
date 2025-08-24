describe('Education Workbench', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/integrations/education', { fixture: 'education.json' }).as('getEducationRecords');
    cy.intercept('POST', '/api/integrations/education/1/verify', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: 1,
          studentName: "John Doe",
          institution: "University of Spring",
          qualification: "BSc Computer Science",
          conferralDate: "2023-05-20",
          verificationStatus: "VERIFIED",
          submittedAt: "2023-01-15T10:00:00Z",
          verifiedAt: new Date().toISOString(),
          createdBy: "user",
          createdAt: "2023-01-15T10:00:00Z",
          updatedBy: "user",
          updatedAt: new Date().toISOString()
        }
      });
    }).as('verifyEducationRecord');

    cy.visit('/education/workbench');
    cy.wait('@getEducationRecords');
  });

  it('should display the education records table', () => {
    cy.get('h1').should('contain', 'Education Workbench');
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length', 2);
  });

  it('should display the details of a record when a row is clicked', () => {
    cy.get('tbody tr:first-child').click();
    cy.get('.chakra-card-header').should('contain', 'John Doe');
    cy.get('.chakra-card-body').should('contain', 'University of Spring');
  });

  it('should verify a record when the verify button is clicked', () => {
    cy.get('tbody tr:first-child .chakra-button').click();
    cy.wait('@verifyEducationRecord');
    cy.get('tbody tr:first-child').should('contain', 'VERIFIED');
  });
});
