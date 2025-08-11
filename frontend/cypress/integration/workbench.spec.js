// Cypress E2E: DWP Workbench Inline Edit and AuditTrail

describe('DWP Workbench Inline Edit and AuditTrail', () => {
  const username = 'testuser';
  const password = 'testpass';

  it('logs in, edits claim status inline, and verifies audit log', () => {
    // Login
    cy.visit('/login');
    cy.get('input').first().type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Should redirect to dashboard/home, then navigate to DWP workbench
    cy.url().should('not.include', '/login');
    cy.visit('/dwp/workbench');

    // Wait for claims table to load
    cy.contains('Benefit Claim Workbench');
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.greaterThan', 0);

    // Inline-edit first claim's status
    cy.get('tbody tr').first().within(() => {
      cy.get('td')
        .eq(1) // status cell
        .click()
        .within(() => {
          cy.get('input').clear().type('UpdatedStatus{enter}');
        });
    });

    // Status cell should update
    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(1).should('contain', 'UpdatedStatus');
    });

    // Click table row to open detail panel
    cy.get('tbody tr').first().click();

    // AuditTrail: wait for and check for "VIEWED" entry
    cy.contains('Audit Trail');
    cy.contains('VIEWED').should('exist');
  });
});