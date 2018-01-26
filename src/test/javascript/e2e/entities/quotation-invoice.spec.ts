import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Quotation e2e test', () => {

    let navBarPage: NavBarPage;
    let quotationDialogPage: QuotationDialogPage;
    let quotationComponentsPage: QuotationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Quotations', () => {
        navBarPage.goToEntity('quotation-invoice');
        quotationComponentsPage = new QuotationComponentsPage();
        expect(quotationComponentsPage.getTitle())
            .toMatch(/invoiceappApp.quotation.home.title/);

    });

    it('should load create Quotation dialog', () => {
        quotationComponentsPage.clickOnCreateButton();
        quotationDialogPage = new QuotationDialogPage();
        expect(quotationDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.quotation.home.createOrEditLabel/);
        quotationDialogPage.close();
    });

   /* it('should create and save Quotations', () => {
        quotationComponentsPage.clickOnCreateButton();
        quotationDialogPage.setDescriptionInput('description');
        expect(quotationDialogPage.getDescriptionInput()).toMatch('description');
        quotationDialogPage.docTypeSelectLastOption();
        quotationDialogPage.setTypeInput('type');
        expect(quotationDialogPage.getTypeInput()).toMatch('type');
        quotationDialogPage.setVatRateInput('5');
        expect(quotationDialogPage.getVatRateInput()).toMatch('5');
        quotationDialogPage.setValidityTermsInput('validityTerms');
        expect(quotationDialogPage.getValidityTermsInput()).toMatch('validityTerms');
        quotationDialogPage.setAcceptionationInput('acceptionation');
        expect(quotationDialogPage.getAcceptionationInput()).toMatch('acceptionation');
        quotationDialogPage.setTitleInput('title');
        expect(quotationDialogPage.getTitleInput()).toMatch('title');
        quotationDialogPage.setNumberInput('number');
        expect(quotationDialogPage.getNumberInput()).toMatch('number');
        quotationDialogPage.setSubTotalBeforeDiscountInput('5');
        expect(quotationDialogPage.getSubTotalBeforeDiscountInput()).toMatch('5');
        quotationDialogPage.setDiscountRateInput('5');
        expect(quotationDialogPage.getDiscountRateInput()).toMatch('5');
        quotationDialogPage.setDiscountAmountInput('5');
        expect(quotationDialogPage.getDiscountAmountInput()).toMatch('5');
        quotationDialogPage.setSubTotalInput('5');
        expect(quotationDialogPage.getSubTotalInput()).toMatch('5');
        quotationDialogPage.setVatAmountInput('5');
        expect(quotationDialogPage.getVatAmountInput()).toMatch('5');
        quotationDialogPage.setTotalInput('5');
        expect(quotationDialogPage.getTotalInput()).toMatch('5');
        quotationDialogPage.setAdditionalInformationInput('additionalInformation');
        expect(quotationDialogPage.getAdditionalInformationInput()).toMatch('additionalInformation');
        quotationDialogPage.familySelectLastOption();
        quotationDialogPage.tenantSelectLastOption();
        quotationDialogPage.save();
        expect(quotationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuotationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-quotation-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuotationDialogPage {
    modalTitle = element(by.css('h4#myQuotationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    docTypeSelect = element(by.css('select#field_docType'));
    typeInput = element(by.css('input#field_type'));
    vatRateInput = element(by.css('input#field_vatRate'));
    validityTermsInput = element(by.css('input#field_validityTerms'));
    acceptionationInput = element(by.css('input#field_acceptionation'));
    titleInput = element(by.css('input#field_title'));
    numberInput = element(by.css('input#field_number'));
    subTotalBeforeDiscountInput = element(by.css('input#field_subTotalBeforeDiscount'));
    discountRateInput = element(by.css('input#field_discountRate'));
    discountAmountInput = element(by.css('input#field_discountAmount'));
    subTotalInput = element(by.css('input#field_subTotal'));
    vatAmountInput = element(by.css('input#field_vatAmount'));
    totalInput = element(by.css('input#field_total'));
    additionalInformationInput = element(by.css('input#field_additionalInformation'));
    familySelect = element(by.css('select#field_family'));
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

    setAcceptionationInput = function(acceptionation) {
        this.acceptionationInput.sendKeys(acceptionation);
    }

    getAcceptionationInput = function() {
        return this.acceptionationInput.getAttribute('value');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    }

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    }

    setSubTotalBeforeDiscountInput = function(subTotalBeforeDiscount) {
        this.subTotalBeforeDiscountInput.sendKeys(subTotalBeforeDiscount);
    }

    getSubTotalBeforeDiscountInput = function() {
        return this.subTotalBeforeDiscountInput.getAttribute('value');
    }

    setDiscountRateInput = function(discountRate) {
        this.discountRateInput.sendKeys(discountRate);
    }

    getDiscountRateInput = function() {
        return this.discountRateInput.getAttribute('value');
    }

    setDiscountAmountInput = function(discountAmount) {
        this.discountAmountInput.sendKeys(discountAmount);
    }

    getDiscountAmountInput = function() {
        return this.discountAmountInput.getAttribute('value');
    }

    setSubTotalInput = function(subTotal) {
        this.subTotalInput.sendKeys(subTotal);
    }

    getSubTotalInput = function() {
        return this.subTotalInput.getAttribute('value');
    }

    setVatAmountInput = function(vatAmount) {
        this.vatAmountInput.sendKeys(vatAmount);
    }

    getVatAmountInput = function() {
        return this.vatAmountInput.getAttribute('value');
    }

    setTotalInput = function(total) {
        this.totalInput.sendKeys(total);
    }

    getTotalInput = function() {
        return this.totalInput.getAttribute('value');
    }

    setAdditionalInformationInput = function(additionalInformation) {
        this.additionalInformationInput.sendKeys(additionalInformation);
    }

    getAdditionalInformationInput = function() {
        return this.additionalInformationInput.getAttribute('value');
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
