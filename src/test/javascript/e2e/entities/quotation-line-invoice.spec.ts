import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('QuotationLine e2e test', () => {

    let navBarPage: NavBarPage;
    let quotationLineDialogPage: QuotationLineDialogPage;
    let quotationLineComponentsPage: QuotationLineComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load QuotationLines', () => {
        navBarPage.goToEntity('quotation-line-invoice');
        quotationLineComponentsPage = new QuotationLineComponentsPage();
        expect(quotationLineComponentsPage.getTitle())
            .toMatch(/invoiceappApp.quotationLine.home.title/);

    });

    it('should load create QuotationLine dialog', () => {
        quotationLineComponentsPage.clickOnCreateButton();
        quotationLineDialogPage = new QuotationLineDialogPage();
        expect(quotationLineDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.quotationLine.home.createOrEditLabel/);
        quotationLineDialogPage.close();
    });

    it('should create and save QuotationLines', () => {
        quotationLineComponentsPage.clickOnCreateButton();
        quotationLineDialogPage.setDescriptionInput('description');
        expect(quotationLineDialogPage.getDescriptionInput()).toMatch('description');
        quotationLineDialogPage.setQuantityInput('5');
        expect(quotationLineDialogPage.getQuantityInput()).toMatch('5');
        quotationLineDialogPage.setUnitCostInput('5');
        expect(quotationLineDialogPage.getUnitCostInput()).toMatch('5');
        quotationLineDialogPage.setSubTotalInput('5');
        expect(quotationLineDialogPage.getSubTotalInput()).toMatch('5');
        quotationLineDialogPage.save();
        expect(quotationLineDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuotationLineComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-quotation-line-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuotationLineDialogPage {
    modalTitle = element(by.css('h4#myQuotationLineLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    quantityInput = element(by.css('input#field_quantity'));
    unitCostInput = element(by.css('input#field_unitCost'));
    subTotalInput = element(by.css('input#field_subTotal'));

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
