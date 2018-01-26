import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InvoiceState e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceStateDialogPage: InvoiceStateDialogPage;
    let invoiceStateComponentsPage: InvoiceStateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InvoiceStates', () => {
        navBarPage.goToEntity('invoice-state-invoice');
        invoiceStateComponentsPage = new InvoiceStateComponentsPage();
        expect(invoiceStateComponentsPage.getTitle())
            .toMatch(/invoiceappApp.invoiceState.home.title/);

    });

    it('should load create InvoiceState dialog', () => {
        invoiceStateComponentsPage.clickOnCreateButton();
        invoiceStateDialogPage = new InvoiceStateDialogPage();
        expect(invoiceStateDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.invoiceState.home.createOrEditLabel/);
        invoiceStateDialogPage.close();
    });

   /* it('should create and save InvoiceStates', () => {
        invoiceStateComponentsPage.clickOnCreateButton();
        invoiceStateDialogPage.statusSelectLastOption();
        invoiceStateDialogPage.setStatusDateInput(12310020012301);
        expect(invoiceStateDialogPage.getStatusDateInput()).toMatch('2001-12-31T02:30');
        invoiceStateDialogPage.invoiceSelectLastOption();
        invoiceStateDialogPage.save();
        expect(invoiceStateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceStateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-invoice-state-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceStateDialogPage {
    modalTitle = element(by.css('h4#myInvoiceStateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));
    statusDateInput = element(by.css('input#field_statusDate'));
    invoiceSelect = element(by.css('select#field_invoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    setStatusDateInput = function(statusDate) {
        this.statusDateInput.sendKeys(statusDate);
    }

    getStatusDateInput = function() {
        return this.statusDateInput.getAttribute('value');
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
