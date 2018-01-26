import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InvoiceLine e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceLineDialogPage: InvoiceLineDialogPage;
    let invoiceLineComponentsPage: InvoiceLineComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InvoiceLines', () => {
        navBarPage.goToEntity('invoice-line-invoice');
        invoiceLineComponentsPage = new InvoiceLineComponentsPage();
        expect(invoiceLineComponentsPage.getTitle())
            .toMatch(/invoiceappApp.invoiceLine.home.title/);

    });

    it('should load create InvoiceLine dialog', () => {
        invoiceLineComponentsPage.clickOnCreateButton();
        invoiceLineDialogPage = new InvoiceLineDialogPage();
        expect(invoiceLineDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.invoiceLine.home.createOrEditLabel/);
        invoiceLineDialogPage.close();
    });

   /* it('should create and save InvoiceLines', () => {
        invoiceLineComponentsPage.clickOnCreateButton();
        invoiceLineDialogPage.setDescriptionInput('description');
        expect(invoiceLineDialogPage.getDescriptionInput()).toMatch('description');
        invoiceLineDialogPage.setQuantityInput('5');
        expect(invoiceLineDialogPage.getQuantityInput()).toMatch('5');
        invoiceLineDialogPage.setUnitCostInput('5');
        expect(invoiceLineDialogPage.getUnitCostInput()).toMatch('5');
        invoiceLineDialogPage.setSubTotalInput('5');
        expect(invoiceLineDialogPage.getSubTotalInput()).toMatch('5');
        invoiceLineDialogPage.invoiceSelectLastOption();
        invoiceLineDialogPage.save();
        expect(invoiceLineDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceLineComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-invoice-line-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceLineDialogPage {
    modalTitle = element(by.css('h4#myInvoiceLineLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    quantityInput = element(by.css('input#field_quantity'));
    unitCostInput = element(by.css('input#field_unitCost'));
    subTotalInput = element(by.css('input#field_subTotal'));
    invoiceSelect = element(by.css('select#field_invoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setQuantityInput = function(quantity) {
        this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput = function() {
        return this.quantityInput.getAttribute('value');
    }

    setUnitCostInput = function(unitCost) {
        this.unitCostInput.sendKeys(unitCost);
    }

    getUnitCostInput = function() {
        return this.unitCostInput.getAttribute('value');
    }

    setSubTotalInput = function(subTotal) {
        this.subTotalInput.sendKeys(subTotal);
    }

    getSubTotalInput = function() {
        return this.subTotalInput.getAttribute('value');
    }

    invoiceSelectLastOption = function() {
        this.invoiceSelect.all(by.tagName('option')).last().click();
    }

    invoiceSelectOption = function(option) {
        this.invoiceSelect.sendKeys(option);
    }

    getInvoiceSelect = function() {
        return this.invoiceSelect;
    }

    getInvoiceSelectedOption = function() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
