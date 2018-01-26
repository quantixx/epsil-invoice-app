import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InvoiceDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceDefinitionDialogPage: InvoiceDefinitionDialogPage;
    let invoiceDefinitionComponentsPage: InvoiceDefinitionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InvoiceDefinitions', () => {
        navBarPage.goToEntity('invoice-definition-invoice');
        invoiceDefinitionComponentsPage = new InvoiceDefinitionComponentsPage();
        expect(invoiceDefinitionComponentsPage.getTitle())
            .toMatch(/invoiceappApp.invoiceDefinition.home.title/);

    });

    it('should load create InvoiceDefinition dialog', () => {
        invoiceDefinitionComponentsPage.clickOnCreateButton();
        invoiceDefinitionDialogPage = new InvoiceDefinitionDialogPage();
        expect(invoiceDefinitionDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.invoiceDefinition.home.createOrEditLabel/);
        invoiceDefinitionDialogPage.close();
    });

   /* it('should create and save InvoiceDefinitions', () => {
        invoiceDefinitionComponentsPage.clickOnCreateButton();
        invoiceDefinitionDialogPage.setTitleInput('title');
        expect(invoiceDefinitionDialogPage.getTitleInput()).toMatch('title');
        invoiceDefinitionDialogPage.setDescriptionInput('description');
        expect(invoiceDefinitionDialogPage.getDescriptionInput()).toMatch('description');
        invoiceDefinitionDialogPage.docTypeSelectLastOption();
        invoiceDefinitionDialogPage.setVatRateInput('5');
        expect(invoiceDefinitionDialogPage.getVatRateInput()).toMatch('5');
        invoiceDefinitionDialogPage.setTermsInput('terms');
        expect(invoiceDefinitionDialogPage.getTermsInput()).toMatch('terms');
        invoiceDefinitionDialogPage.setPenaltiesInput('penalties');
        expect(invoiceDefinitionDialogPage.getPenaltiesInput()).toMatch('penalties');
        invoiceDefinitionDialogPage.familySelectLastOption();
        invoiceDefinitionDialogPage.languageSelectLastOption();
        invoiceDefinitionDialogPage.tenantSelectLastOption();
        invoiceDefinitionDialogPage.save();
        expect(invoiceDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-invoice-definition-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceDefinitionDialogPage {
    modalTitle = element(by.css('h4#myInvoiceDefinitionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#field_description'));
    docTypeSelect = element(by.css('select#field_docType'));
    vatRateInput = element(by.css('input#field_vatRate'));
    termsInput = element(by.css('input#field_terms'));
    penaltiesInput = element(by.css('input#field_penalties'));
    familySelect = element(by.css('select#field_family'));
    languageSelect = element(by.css('select#field_language'));
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
