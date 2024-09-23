describe('Data Extraction', () => {
    it('Dynamic Data extraction', () => {
        cy.visit('https://www.espncricinfo.com/');
        cy.get('.icon-menu-outlined').click();
        cy.get('form.ds-w-full > :nth-child(1) > .ds-flex > .ds-grow > .ds-w-full').type('Babar Azam');
        cy.get('.icon-arrow_forward-filled').click();
        cy.get('.name > a').click();
        cy.get(':nth-child(2) > .ds-px-4 > .ds-flex > .ds-text-title-xs').scrollIntoView();

        cy.get(':nth-child(2) > .ds-p-0 > :nth-child(1) > .ds-overflow-x-auto > .ds-w-full')
            .find('tbody')
            .find('tr')
            .each(($row) => {
                cy.wrap($row).find('td').eq(0).invoke('text').then((Format) => {
                    if (Format.trim() === 'ODIs') {
                        cy.wrap($row).find('td').eq(9).invoke('text').then((centuries) => {
                            cy.log(`ODI Centuries: ${centuries.trim()}`);
                        });
                    }
                });
            });
    });
});
