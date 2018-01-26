import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bank e2e test', () => {

    let navBarPage: NavBarPage;
    let bankDialogPage: BankDialogPage;
    let bankComponentsPage: BankComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Banks', () => {
        navBarPage.goToEntity('bank-invoice');
        bankComponentsPage = new BankComponentsPage();
        expect(bankComponentsPage.getTitle())
            .toMatch(/invoiceappApp.bank.home.title/);

    });

    it('should load create Bank dialog', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage = new BankDialogPage();
        expect(bankDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.bank.home.createOrEditLabel/);
        bankDialogPage.close();
    });

    it('should create and save Banks', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage.setBankNameInput('bankName');
        expect(bankDialogPage.getBankNameInput()).toMatch('bankName');
        bankDialogPage.setAgencyNameInput('agencyName');
        expect(bankDialogPage.getAgencyNameInput()).toMatch('agencyName');
        bankDialogPage.setBankAccountInput('bankAccount');
        expect(bankDialogPage.getBankAccountInput()).toMatch('bankAccount');
        bankDialogPage.setIbanInput('iban');
        expect(bankDialogPage.getIbanInput()).toMatch('iban');
        bankDialogPage.setBicInput('bic');
        expect(bankDialogPage.getBicInput()).toMatch('bic');
        bankDialogPage.setPhoneAreaInput('phoneArea');
        expect(bankDialogPage.getPhoneAreaInput()).toMatch('phoneArea');
        bankDialogPage.setPhoneNumberInput('phoneNumber');
        expect(bankDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        bankDialogPage.addressSelectLastOption();
        bankDialogPage.save();
        expect(bankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-bank-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BankDialogPage {
    modalTitle = element(by.css('h4#myBankLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bankNameInput = element(by.css('input#field_bankName'));
    agencyNameInput = element(by.css('input#field_agencyName'));
    bankAccountInput = element(by.css('input#field_bankAccount'));
    ibanInput = element(by.css('input#field_iban'));
    bicInput = element(by.css('input#field_bic'));
    phoneAreaInput = element(by.css('input#field_phoneArea'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    addressSelect = element(by.css('select#field_address'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBankNameInput = function(bankName) {
        this.bankNameInput.sendKeys(bankName);
    }

    getBankNameInput = function() {
        return this.bankNameInput.getAttribute('value');
    }

    setAgencyNameInput = function(agencyName) {
        this.agencyNameInput.sendKeys(agencyName);
    }

    getAgencyNameInput = function() {
        return this.agencyNameInput.getAttribute('value');
    }

    setBankAccountInput = function(bankAccount) {
        this.bankAccountInput.sendKeys(bankAccount);
    }

    getBankAccountInput = function() {
        return this.bankAccountInput.getAttribute('value');
    }

    setIbanInput = function(iban) {
        this.ibanInput.sendKeys(iban);
    }

    getIbanInput = function() {
        return this.ibanInput.getAttribute('value');
    }

    setBicInput = function(bic) {
        this.bicInput.sendKeys(bic);
    }

    getBicInput = function() {
        return this.bicInput.getAttribute('value');
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
