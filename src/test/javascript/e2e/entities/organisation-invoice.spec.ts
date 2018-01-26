import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Organisation e2e test', () => {

    let navBarPage: NavBarPage;
    let organisationDialogPage: OrganisationDialogPage;
    let organisationComponentsPage: OrganisationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Organisations', () => {
        navBarPage.goToEntity('organisation-invoice');
        organisationComponentsPage = new OrganisationComponentsPage();
        expect(organisationComponentsPage.getTitle())
            .toMatch(/invoiceappApp.organisation.home.title/);

    });

    it('should load create Organisation dialog', () => {
        organisationComponentsPage.clickOnCreateButton();
        organisationDialogPage = new OrganisationDialogPage();
        expect(organisationDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.organisation.home.createOrEditLabel/);
        organisationDialogPage.close();
    });

   /* it('should create and save Organisations', () => {
        organisationComponentsPage.clickOnCreateButton();
        organisationDialogPage.setSlugInput('slug');
        expect(organisationDialogPage.getSlugInput()).toMatch('slug');
        organisationDialogPage.setNameInput('name');
        expect(organisationDialogPage.getNameInput()).toMatch('name');
        organisationDialogPage.setBusinessIdentificationInput('businessIdentification');
        expect(organisationDialogPage.getBusinessIdentificationInput()).toMatch('businessIdentification');
        organisationDialogPage.setCorporateNameInput('corporateName');
        expect(organisationDialogPage.getCorporateNameInput()).toMatch('corporateName');
        organisationDialogPage.setVatIdentificationInput('vatIdentification');
        expect(organisationDialogPage.getVatIdentificationInput()).toMatch('vatIdentification');
        organisationDialogPage.getActivatedInput().isSelected().then((selected) => {
            if (selected) {
                organisationDialogPage.getActivatedInput().click();
                expect(organisationDialogPage.getActivatedInput().isSelected()).toBeFalsy();
            } else {
                organisationDialogPage.getActivatedInput().click();
                expect(organisationDialogPage.getActivatedInput().isSelected()).toBeTruthy();
            }
        });
        organisationDialogPage.setCreatedOnInput(12310020012301);
        expect(organisationDialogPage.getCreatedOnInput()).toMatch('2001-12-31T02:30');
        organisationDialogPage.addressSelectLastOption();
        organisationDialogPage.contactSelectLastOption();
        organisationDialogPage.tenantSelectLastOption();
        organisationDialogPage.save();
        expect(organisationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrganisationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-organisation-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrganisationDialogPage {
    modalTitle = element(by.css('h4#myOrganisationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    slugInput = element(by.css('input#field_slug'));
    nameInput = element(by.css('input#field_name'));
    businessIdentificationInput = element(by.css('input#field_businessIdentification'));
    corporateNameInput = element(by.css('input#field_corporateName'));
    vatIdentificationInput = element(by.css('input#field_vatIdentification'));
    activatedInput = element(by.css('input#field_activated'));
    createdOnInput = element(by.css('input#field_createdOn'));
    addressSelect = element(by.css('select#field_address'));
    contactSelect = element(by.css('select#field_contact'));
    tenantSelect = element(by.css('select#field_tenant'));

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

    setBusinessIdentificationInput = function(businessIdentification) {
        this.businessIdentificationInput.sendKeys(businessIdentification);
    }

    getBusinessIdentificationInput = function() {
        return this.businessIdentificationInput.getAttribute('value');
    }

    setCorporateNameInput = function(corporateName) {
        this.corporateNameInput.sendKeys(corporateName);
    }

    getCorporateNameInput = function() {
        return this.corporateNameInput.getAttribute('value');
    }

    setVatIdentificationInput = function(vatIdentification) {
        this.vatIdentificationInput.sendKeys(vatIdentification);
    }

    getVatIdentificationInput = function() {
        return this.vatIdentificationInput.getAttribute('value');
    }

    getActivatedInput = function() {
        return this.activatedInput;
    }
    setCreatedOnInput = function(createdOn) {
        this.createdOnInput.sendKeys(createdOn);
    }

    getCreatedOnInput = function() {
        return this.createdOnInput.getAttribute('value');
    }

    addressSelectLastOption = function() {
        this.addressSelect.all(by.tagName('option')).last().click();
    }

    addressSelectOption = function(option) {
        this.addressSelect.sendKeys(option);
    }

    getAddressSelect = function() {
        return this.addressSelect;
    }

    getAddressSelectedOption = function() {
        return this.addressSelect.element(by.css('option:checked')).getText();
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
