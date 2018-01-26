import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contact e2e test', () => {

    let navBarPage: NavBarPage;
    let contactDialogPage: ContactDialogPage;
    let contactComponentsPage: ContactComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contacts', () => {
        navBarPage.goToEntity('contact-invoice');
        contactComponentsPage = new ContactComponentsPage();
        expect(contactComponentsPage.getTitle())
            .toMatch(/invoiceappApp.contact.home.title/);

    });

    it('should load create Contact dialog', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage = new ContactDialogPage();
        expect(contactDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.contact.home.createOrEditLabel/);
        contactDialogPage.close();
    });

    it('should create and save Contacts', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage.setFirstNameInput('firstName');
        expect(contactDialogPage.getFirstNameInput()).toMatch('firstName');
        contactDialogPage.setLastNameInput('lastName');
        expect(contactDialogPage.getLastNameInput()).toMatch('lastName');
        contactDialogPage.getActivatedInput().isSelected().then((selected) => {
            if (selected) {
                contactDialogPage.getActivatedInput().click();
                expect(contactDialogPage.getActivatedInput().isSelected()).toBeFalsy();
            } else {
                contactDialogPage.getActivatedInput().click();
                expect(contactDialogPage.getActivatedInput().isSelected()).toBeTruthy();
            }
        });
        contactDialogPage.setEmailInput('email');
        expect(contactDialogPage.getEmailInput()).toMatch('email');
        contactDialogPage.setPhoneAreaInput('phoneArea');
        expect(contactDialogPage.getPhoneAreaInput()).toMatch('phoneArea');
        contactDialogPage.setPhoneNumberInput('phoneNumber');
        expect(contactDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        contactDialogPage.save();
        expect(contactDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContactComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-contact-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContactDialogPage {
    modalTitle = element(by.css('h4#myContactLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    activatedInput = element(by.css('input#field_activated'));
    emailInput = element(by.css('input#field_email'));
    phoneAreaInput = element(by.css('input#field_phoneArea'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    }

    getActivatedInput = function() {
        return this.activatedInput;
    }
    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setPhoneAreaInput = function(phoneArea) {
        this.phoneAreaInput.sendKeys(phoneArea);
    }

    getPhoneAreaInput = function() {
        return this.phoneAreaInput.getAttribute('value');
    }

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    }

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
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
