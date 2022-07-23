describe('Navigation', () => {
  it('Should nav to Join Page', () => {
    cy.visit('/');
    cy.get('[data-cy=join-link-button]').click();
    cy.url().should('include', '/join');
    cy.get('h2').contains('Join Online Below');
  });
});
