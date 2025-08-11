// Cypress E2E for Employers flow
describe('Employers Flow', () => {
  const username = 'testuser';
  const password = 'testpass';
  const companyName = 'Cypress Test Company ' + Date.now();

  it('logs in, submits, verifies employer', () => {
    // Login
    cy.visit('/login');
    cy.get('input').first().type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Should redirect and allow navigation
    cy.url().should('not.include', '/login');
    cy.visit('/employers');

    // Submit new employer
    cy.contains('New Submission').click();
    cy.get('input[placeholder="Enter company name"]').type(companyName);
    cy.get('button[type="submit"]').contains('Submit').click();

    // Wait for toast and modal close
    cy.contains('Employer submitted.').should('exist');
    cy.contains('Employer submitted.').should('not.exist');

    // Verify the new employer appears in the table
    cy.contains('td', companyName).should('exist');

    // Click Verify and approve
    cy.contains('td', companyName)
      .parent('tr')
      .within(() => {
        cy.contains('button', 'Verify').click();
      });

    cy.get('button').contains('Approve').click();

    cy.contains('Employer approved').should('exist');
    cy.contains('Employer approved').should('not.exist');

    // Status should update to VERIFIED
    cy.contains('td', companyName)
      .parent('tr')
      .within(() => {
        cy.contains('VERIFIED').should('exist');
      });
  });
});