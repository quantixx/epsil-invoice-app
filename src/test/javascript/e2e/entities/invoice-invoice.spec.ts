import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Invoice e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceDialogPage: InvoiceDialogPage;
    let invoiceComponentsPage: InvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invoices', () => {
        navBarPage.goToEntity('invoice-invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(invoiceComponentsPage.getTitle())
            .toMatch(/invoiceappApp.invoice.home.title/);

    });

    it('should load create Invoice dialog', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage = new InvoiceDialogPage();
        expect(invoiceDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.invoice.home.createOrEditLabel/);
        invoiceDialogPage.close();
    });

   /* it('should create and save Invoices', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage.setTitleInput('title');
        expect(invoiceDialogPage.getTitleInput()).toMatch('title');
        invoiceDialogPage.setDescriptionInput('description');
        expect(invoiceDialogPage.getDescriptionInput()).toMatch('description');
        invoiceDialogPage.docTypeSelectLastOption();
        invoiceDialogPage.setVatRateInput('5');
        expect(invoiceDialogPage.getVatRateInput()).toMatch('5');
        invoiceDialogPage.setTermsInput('terms');
        expect(invoiceDialogPage.getTermsInput()).toMatch('terms');
        invoiceDialogPage.setPenaltiesInput('penalties');
        expect(invoiceDialogPage.getPenaltiesInput()).toMatch('penalties');
        invoiceDialogPage.setNumberInput('number');
        expect(invoiceDialogPage.getNumberInput()).toMatch('number');
        invoiceDialogPage.invoiceTypeSelectLastOption();
        invoiceDialogPage.setPoNumberInput('poNumber');
        expect(invoiceDialogPage.getPoNumberInput()).toMatch('poNumber');
        invoiceDialogPage.setSubTotalBeforeDiscountInput('5');
        expect(invoiceDialogPage.getSubTotalBeforeDiscountInput()).toMatch('5');
        invoiceDialogPage.setDiscountRateInput('5');
        expect(invoiceDialogPage.getDiscountRateInput()).toMatch('5');
        invoiceDialogPage.setDiscountAmountInput('5');
        expect(invoiceDialogPage.getDiscountAmountInput()).toMatch('5');
        invoiceDialogPage.setSubTotalInput('5');
        expect(invoiceDialogPage.getSubTotalInput()).toMatch('5');
        invoiceDialogPage.setVatAmountInput('5');
        expect(invoiceDialogPage.getVatAmountInput()).toMatch('5');
        invoiceDialogPage.setTotalInput('5');
        expect(invoiceDialogPage.getTotalInput()).toMatch('5');
        invoiceDialogPage.setAdditionalInformationInput('additionalInformation');
        expect(invoiceDialogPage.getAdditionalInformationInput()).toMatch('additionalInformation');
        invoiceDialogPage.linkedSelectLastOption();
        invoiceDialogPage.organisationSelectLastOption();
        invoiceDialogPage.quotationSelectLastOption();
        invoiceDialogPage.documentSelectLastOption();
        invoiceDialogPage.languageSelectLastOption();
        invoiceDialogPage.currencySelectLastOption();
        invoiceDialogPage.familySelectLastOption();
        invoiceDialogPage.tenantSelectLastOption();
        invoiceDialogPage.save();
        expect(invoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-invoice-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceDialogPage {
    modalTitle = element(by.css('h4#myInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#field_description'));
    docTypeSelect = element(by.css('select#field_docType'));
    vatRateInput = element(by.css('input#field_vatRate'));
    termsInput = element(by.css('input#field_terms'));
    penaltiesInput = element(by.css('input#field_penalties'));
    numberInput = element(by.css('input#field_number'));
    invoiceTypeSelect = element(by.css('select#field_invoiceType'));
    poNumberInput = element(by.css('input#field_poNumber'));
    subTotalBeforeDiscountInput = element(by.css('input#field_subTotalBeforeDiscount'));
    discountRateInput = element(by.css('input#field_discountRate'));
    discountAmountInput = element(by.css('input#field_discountAmount'));
    subTotalInput = element(by.css('input#field_subTotal'));
    vatAmountInput = element(by.css('input#field_vatAmount'));
    totalInput = element(by.css('input#field_total'));
    additionalInformationInput = element(by.css('input#field_additionalInformation'));
    linkedSelect = element(by.css('select#field_linked'));
    organisationSelect = element(by.css('select#field_organisation'));
    quotationSelect = element(by.css('select#field_quotation'));
    documentSelect = element(by.css('select#field_document'));
    languageSelect = element(by.css('select#field_language'));
    currencySelect = element(by.css('select#field_currency'));
    familySelect = element(by.css('select#field_family'));
    tenantSelect = element(by.css('select#field_tenant'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
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
    setVatRateInput = function(vatRate) {
        this.vatRateInput.sendKeys(vatRate);
    }

    getVatRateInput = function() {
        return this.vatRateInput.getAttribute('value');
    }

    setTermsInput = function(terms) {
        this.termsInput.sendKeys(terms);
    }

    getTermsInput = function() {
        return this.termsInput.getAttribute('value');
    }

    setPenaltiesInput = function(penalties) {
        this.penaltiesInput.sendKeys(penalties);
    }

    getPenaltiesInput = function() {
        return this.penaltiesInput.getAttribute('value');
    }

    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    }

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    }

    setInvoiceTypeSelect = function(invoiceType) {
        this.invoiceTypeSelect.sendKeys(invoiceType);
    }

    getInvoiceTypeSelect = function() {
        return this.invoiceTypeSelect.element(by.css('option:checked')).getText();
    }

    invoiceTypeSelectLastOption = function() {
        this.invoiceTypeSelect.all(by.tagName('option')).last().click();
    }
    setPoNumberInput = function(poNumber) {
        this.poNumberInput.sendKeys(poNumber);
    }

    getPoNumberInput = function() {
        return this.poNumberInput.getAttribute('value');
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

    linkedSelectLastOption = function() {
        this.linkedSelect.all(by.tagName('option')).last().click();
    }

    linkedSelectOption = function(option) {
        this.linkedSelect.sendKeys(option);
    }

    getLinkedSelect = function() {
        return this.linkedSelect;
    }

    getLinkedSelectedOption = function() {
        return this.linkedSelect.element(by.css('option:checked')).getText();
    }

    organisationSelectLastOption = function() {
        this.organisationSelect.all(by.tagName('option')).last().click();
    }

    organisationSelectOption = function(option) {
        this.organisationSelect.sendKeys(option);
    }

    getOrganisationSelect = function() {
        return this.organisationSelect;
    }

    getOrganisationSelectedOption = function() {
        return this.organisationSelect.element(by.css('option:checked')).getText();
    }

    quotationSelectLastOption = function() {
        this.quotationSelect.all(by.tagName('option')).last().click();
    }

    quotationSelectOption = function(option) {
        this.quotationSelect.sendKeys(option);
    }

    getQuotationSelect = function() {
        return this.quotationSelect;
    }

    getQuotationSelectedOption = function() {
        return this.quotationSelect.element(by.css('option:checked')).getText();
    }

    documentSelectLastOption = function() {
        this.documentSelect.all(by.tagName('option')).last().click();
    }

    documentSelectOption = function(option) {
        this.documentSelect.sendKeys(option);
    }

    getDocumentSelect = function() {
        return this.documentSelect;
    }

    getDocumentSelectedOption = function() {
        return this.documentSelect.element(by.css('option:checked')).getText();
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

    currencySelectLastOption = function() {
        this.currencySelect.all(by.tagName('option')).last().click();
    }

    currencySelectOption = function(option) {
        this.currencySelect.sendKeys(option);
    }

    getCurrencySelect = function() {
        return this.currencySelect;
    }

    getCurrencySelectedOption = function() {
        return this.currencySelect.element(by.css('option:checked')).getText();
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
