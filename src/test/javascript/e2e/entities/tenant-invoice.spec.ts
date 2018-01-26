import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tenant e2e test', () => {

    let navBarPage: NavBarPage;
    let tenantDialogPage: TenantDialogPage;
    let tenantComponentsPage: TenantComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tenants', () => {
        navBarPage.goToEntity('tenant-invoice');
        tenantComponentsPage = new TenantComponentsPage();
        expect(tenantComponentsPage.getTitle())
            .toMatch(/invoiceappApp.tenant.home.title/);

    });

    it('should load create Tenant dialog', () => {
        tenantComponentsPage.clickOnCreateButton();
        tenantDialogPage = new TenantDialogPage();
        expect(tenantDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.tenant.home.createOrEditLabel/);
        tenantDialogPage.close();
    });

   /* it('should create and save Tenants', () => {
        tenantComponentsPage.clickOnCreateButton();
        tenantDialogPage.setSlugInput('slug');
        expect(tenantDialogPage.getSlugInput()).toMatch('slug');
        tenantDialogPage.setNameInput('name');
        expect(tenantDialogPage.getNameInput()).toMatch('name');
        tenantDialogPage.setCompanyNameInput('companyName');
        expect(tenantDialogPage.getCompanyNameInput()).toMatch('companyName');
        tenantDialogPage.setDescriptionInput('description');
        expect(tenantDialogPage.getDescriptionInput()).toMatch('description');
        tenantDialogPage.setVatIdentificationInput('vatIdentification');
        expect(tenantDialogPage.getVatIdentificationInput()).toMatch('vatIdentification');
        tenantDialogPage.setBusinessIdentificationInput('businessIdentification');
        expect(tenantDialogPage.getBusinessIdentificationInput()).toMatch('businessIdentification');
        tenantDialogPage.setBusinessRegistryInput('businessRegistry');
        expect(tenantDialogPage.getBusinessRegistryInput()).toMatch('businessRegistry');
        tenantDialogPage.setBusinessCodeInput('businessCode');
        expect(tenantDialogPage.getBusinessCodeInput()).toMatch('businessCode');
        tenantDialogPage.setFinancialYearFromInput('financialYearFrom');
        expect(tenantDialogPage.getFinancialYearFromInput()).toMatch('financialYearFrom');
        tenantDialogPage.setFinancialYearToInput('financialYearTo');
        expect(tenantDialogPage.getFinancialYearToInput()).toMatch('financialYearTo');
        tenantDialogPage.invoiceAddressSelectLastOption();
        tenantDialogPage.bankSelectLastOption();
        tenantDialogPage.logoSelectLastOption();
        tenantDialogPage.contactSelectLastOption();
        tenantDialogPage.save();
        expect(tenantDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TenantComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-tenant-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TenantDialogPage {
    modalTitle = element(by.css('h4#myTenantLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    slugInput = element(by.css('input#field_slug'));
    nameInput = element(by.css('input#field_name'));
    companyNameInput = element(by.css('input#field_companyName'));
    descriptionInput = element(by.css('input#field_description'));
    vatIdentificationInput = element(by.css('input#field_vatIdentification'));
    businessIdentificationInput = element(by.css('input#field_businessIdentification'));
    businessRegistryInput = element(by.css('input#field_businessRegistry'));
    businessCodeInput = element(by.css('input#field_businessCode'));
    financialYearFromInput = element(by.css('input#field_financialYearFrom'));
    financialYearToInput = element(by.css('input#field_financialYearTo'));
    invoiceAddressSelect = element(by.css('select#field_invoiceAddress'));
    bankSelect = element(by.css('select#field_bank'));
    logoSelect = element(by.css('select#field_logo'));
    contactSelect = element(by.css('select#field_contact'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSlugInput = function(slug) {
        this.slugInput.sendKeys(slug);
    }

    getSlugInput = function() {
        return this.slugInput.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setCompanyNameInput = function(companyName) {
        this.companyNameInput.sendKeys(companyName);
    }

    getCompanyNameInput = function() {
        return this.companyNameInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setVatIdentificationInput = function(vatIdentification) {
        this.vatIdentificationInput.sendKeys(vatIdentification);
    }

    getVatIdentificationInput = function() {
        return this.vatIdentificationInput.getAttribute('value');
    }

    setBusinessIdentificationInput = function(businessIdentification) {
        this.businessIdentificationInput.sendKeys(businessIdentification);
    }

    getBusinessIdentificationInput = function() {
        return this.businessIdentificationInput.getAttribute('value');
    }

    setBusinessRegistryInput = function(businessRegistry) {
        this.businessRegistryInput.sendKeys(businessRegistry);
    }

    getBusinessRegistryInput = function() {
        return this.businessRegistryInput.getAttribute('value');
    }

    setBusinessCodeInput = function(businessCode) {
        this.businessCodeInput.sendKeys(businessCode);
    }

    getBusinessCodeInput = function() {
        return this.businessCodeInput.getAttribute('value');
    }

    setFinancialYearFromInput = function(financialYearFrom) {
        this.financialYearFromInput.sendKeys(financialYearFrom);
    }

    getFinancialYearFromInput = function() {
        return this.financialYearFromInput.getAttribute('value');
    }

    setFinancialYearToInput = function(financialYearTo) {
        this.financialYearToInput.sendKeys(financialYearTo);
    }

    getFinancialYearToInput = function() {
        return this.financialYearToInput.getAttribute('value');
    }

    invoiceAddressSelectLastOption = function() {
        this.invoiceAddressSelect.all(by.tagName('option')).last().click();
    }

    invoiceAddressSelectOption = function(option) {
        this.invoiceAddressSelect.sendKeys(option);
    }

    getInvoiceAddressSelect = function() {
        return this.invoiceAddressSelect;
    }

    getInvoiceAddressSelectedOption = function() {
        return this.invoiceAddressSelect.element(by.css('option:checked')).getText();
    }

    bankSelectLastOption = function() {
        this.bankSelect.all(by.tagName('option')).last().click();
    }

    bankSelectOption = function(option) {
        this.bankSelect.sendKeys(option);
    }

    getBankSelect = function() {
        return this.bankSelect;
    }

    getBankSelectedOption = function() {
        return this.bankSelect.element(by.css('option:checked')).getText();
    }

    logoSelectLastOption = function() {
        this.logoSelect.all(by.tagName('option')).last().click();
    }

    logoSelectOption = function(option) {
        this.logoSelect.sendKeys(option);
    }

    getLogoSelect = function() {
        return this.logoSelect;
    }

    getLogoSelectedOption = function() {
        return this.logoSelect.element(by.css('option:checked')).getText();
    }

    contactSelectLastOption = function() {
        this.contactSelect.all(by.tagName('option')).last().click();
    }

    contactSelectOption = function(option) {
        this.contactSelect.sendKeys(option);
    }

    getContactSelect = function() {
        return this.contactSelect;
    }

    getContactSelectedOption = function() {
        return this.contactSelect.element(by.css('option:checked')).getText();
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
