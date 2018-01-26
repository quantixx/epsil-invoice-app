import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('QuotationState e2e test', () => {

    let navBarPage: NavBarPage;
    let quotationStateDialogPage: QuotationStateDialogPage;
    let quotationStateComponentsPage: QuotationStateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load QuotationStates', () => {
        navBarPage.goToEntity('quotation-state-invoice');
        quotationStateComponentsPage = new QuotationStateComponentsPage();
        expect(quotationStateComponentsPage.getTitle())
            .toMatch(/invoiceappApp.quotationState.home.title/);

    });

    it('should load create QuotationState dialog', () => {
        quotationStateComponentsPage.clickOnCreateButton();
        quotationStateDialogPage = new QuotationStateDialogPage();
        expect(quotationStateDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.quotationState.home.createOrEditLabel/);
        quotationStateDialogPage.close();
    });

    it('should create and save QuotationStates', () => {
        quotationStateComponentsPage.clickOnCreateButton();
        quotationStateDialogPage.statusSelectLastOption();
        quotationStateDialogPage.setStatusDateInput(12310020012301);
        expect(quotationStateDialogPage.getStatusDateInput()).toMatch('2001-12-31T02:30');
        quotationStateDialogPage.save();
        expect(quotationStateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuotationStateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-quotation-state-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuotationStateDialogPage {
    modalTitle = element(by.css('h4#myQuotationStateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));
    statusDateInput = element(by.css('input#field_statusDate'));

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
