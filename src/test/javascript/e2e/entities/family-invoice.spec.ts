import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Family e2e test', () => {

    let navBarPage: NavBarPage;
    let familyDialogPage: FamilyDialogPage;
    let familyComponentsPage: FamilyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Families', () => {
        navBarPage.goToEntity('family-invoice');
        familyComponentsPage = new FamilyComponentsPage();
        expect(familyComponentsPage.getTitle())
            .toMatch(/invoiceappApp.family.home.title/);

    });

    it('should load create Family dialog', () => {
        familyComponentsPage.clickOnCreateButton();
        familyDialogPage = new FamilyDialogPage();
        expect(familyDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.family.home.createOrEditLabel/);
        familyDialogPage.close();
    });

   /* it('should create and save Families', () => {
        familyComponentsPage.clickOnCreateButton();
        familyDialogPage.setSlugInput('slug');
        expect(familyDialogPage.getSlugInput()).toMatch('slug');
        familyDialogPage.setNameInput('name');
        expect(familyDialogPage.getNameInput()).toMatch('name');
        familyDialogPage.setDescriptionInput('description');
        expect(familyDialogPage.getDescriptionInput()).toMatch('description');
        familyDialogPage.tenantSelectLastOption();
        familyDialogPage.save();
        expect(familyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FamilyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-family-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FamilyDialogPage {
    modalTitle = element(by.css('h4#myFamilyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    slugInput = element(by.css('input#field_slug'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
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

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
