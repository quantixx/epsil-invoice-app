import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('QuotationDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let quotationDefinitionDialogPage: QuotationDefinitionDialogPage;
    let quotationDefinitionComponentsPage: QuotationDefinitionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load QuotationDefinitions', () => {
        navBarPage.goToEntity('quotation-definition-invoice');
        quotationDefinitionComponentsPage = new QuotationDefinitionComponentsPage();
        expect(quotationDefinitionComponentsPage.getTitle())
            .toMatch(/invoiceappApp.quotationDefinition.home.title/);

    });

    it('should load create QuotationDefinition dialog', () => {
        quotationDefinitionComponentsPage.clickOnCreateButton();
        quotationDefinitionDialogPage = new QuotationDefinitionDialogPage();
        expect(quotationDefinitionDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.quotationDefinition.home.createOrEditLabel/);
        quotationDefinitionDialogPage.close();
    });

   /* it('should create and save QuotationDefinitions', () => {
        quotationDefinitionComponentsPage.clickOnCreateButton();
        quotationDefinitionDialogPage.setDescriptionInput('description');
        expect(quotationDefinitionDialogPage.getDescriptionInput()).toMatch('description');
        quotationDefinitionDialogPage.docTypeSelectLastOption();
        quotationDefinitionDialogPage.setTypeInput('type');
        expect(quotationDefinitionDialogPage.getTypeInput()).toMatch('type');
        quotationDefinitionDialogPage.setVatRateInput('5');
        expect(quotationDefinitionDialogPage.getVatRateInput()).toMatch('5');
        quotationDefinitionDialogPage.setValidityTermsInput('validityTerms');
        expect(quotationDefinitionDialogPage.getValidityTermsInput()).toMatch('validityTerms');
        quotationDefinitionDialogPage.setAcceptationInput('acceptation');
        expect(quotationDefinitionDialogPage.getAcceptationInput()).toMatch('acceptation');
        quotationDefinitionDialogPage.familySelectLastOption();
        quotationDefinitionDialogPage.languageSelectLastOption();
        quotationDefinitionDialogPage.tenantSelectLastOption();
        quotationDefinitionDialogPage.save();
        expect(quotationDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuotationDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-quotation-definition-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuotationDefinitionDialogPage {
    modalTitle = element(by.css('h4#myQuotationDefinitionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    docTypeSelect = element(by.css('select#field_docType'));
    typeInput = element(by.css('input#field_type'));
    vatRateInput = element(by.css('input#field_vatRate'));
    validityTermsInput = element(by.css('input#field_validityTerms'));
    acceptationInput = element(by.css('input#field_acceptation'));
    familySelect = element(by.css('select#field_family'));
    languageSelect = element(by.css('select#field_language'));
    tenantSelect = element(by.css('select#field_tenant'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setDocTypeSelect = function(docType) {
        this.docTypeSelect.sendKeys(docType);
    }

    getDocTypeSelect = function() {
        return this.docTypeSelect.element(by.css('option:checked')).getText();
    }

    docTypeSelectLastOption = function() {
        this.docTypeSelect.all(by.tagName('option')).last().click();
    }
    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setVatRateInput = function(vatRate) {
        this.vatRateInput.sendKeys(vatRate);
    }

    getVatRateInput = function() {
        return this.vatRateInput.getAttribute('value');
    }

    setValidityTermsInput = function(validityTerms) {
        this.validityTermsInput.sendKeys(validityTerms);
    }

    getValidityTermsInput = function() {
        return this.validityTermsInput.getAttribute('value');
    }

    setAcceptationInput = function(acceptation) {
        this.acceptationInput.sendKeys(acceptation);
    }

    getAcceptationInput = function() {
        return this.acceptationInput.getAttribute('value');
    }

    familySelectLastOption = function() {
        this.familySelect.all(by.tagName('option')).last().click();
    }

    familySelectOption = function(option) {
        this.familySelect.sendKeys(option);
    }

    getFamilySelect = function() {
        return this.familySelect;
    }

    getFamilySelectedOption = function() {
        return this.familySelect.element(by.css('option:checked')).getText();
    }

    languageSelectLastOption = function() {
        this.languageSelect.all(by.tagName('option')).last().click();
    }

    languageSelectOption = function(option) {
        this.languageSelect.sendKeys(option);
    }

    getLanguageSelect = function() {
        return this.languageSelect;
    }

    getLanguageSelectedOption = function() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    tenantSelectLastOption = function() {
        this.tenantSelect.all(by.tagName('option')).last().click();
    }

    tenantSelectOption = function(option) {
        this.tenantSelect.sendKeys(option);
    }

    getTenantSelect = function() {
        return this.tenantSelect;
    }

    getTenantSelectedOption = function() {
        return this.tenantSelect.element(by.css('option:checked')).getText();
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
