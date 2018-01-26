import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-invoice');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/invoiceappApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setStreetInput('street');
        expect(addressDialogPage.getStreetInput()).toMatch('street');
        addressDialogPage.setStreet2Input('street2');
        expect(addressDialogPage.getStreet2Input()).toMatch('street2');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setStateInput('state');
        expect(addressDialogPage.getStateInput()).toMatch('state');
        addressDialogPage.setZipCodeInput('zipCode');
        expect(addressDialogPage.getZipCodeInput()).toMatch('zipCode');
        addressDialogPage.setAdditionalInformationInput('additionalInformation');
        expect(addressDialogPage.getAdditionalInformationInput()).toMatch('additionalInformation');
        addressDialogPage.countrySelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-address-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    streetInput = element(by.css('input#field_street'));
    street2Input = element(by.css('input#field_street2'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    zipCodeInput = element(by.css('input#field_zipCode'));
    additionalInformationInput = element(by.css('input#field_additionalInformation'));
    countrySelect = element(by.css('select#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStreetInput = function(street) {
        this.streetInput.sendKeys(street);
    }

    getStreetInput = function() {
        return this.streetInput.getAttribute('value');
    }

    setStreet2Input = function(street2) {
        this.street2Input.sendKeys(street2);
    }

    getStreet2Input = function() {
        return this.street2Input.getAttribute('value');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    }

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    }

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
    }

    setZipCodeInput = function(zipCode) {
        this.zipCodeInput.sendKeys(zipCode);
    }

    getZipCodeInput = function() {
        return this.zipCodeInput.getAttribute('value');
    }

    setAdditionalInformationInput = function(additionalInformation) {
        this.additionalInformationInput.sendKeys(additionalInformation);
    }

    getAdditionalInformationInput = function() {
        return this.additionalInformationInput.getAttribute('value');
    }

    countrySelectLastOption = function() {
        this.countrySelect.all(by.tagName('option')).last().click();
    }

    countrySelectOption = function(option) {
        this.countrySelect.sendKeys(option);
    }

    getCountrySelect = function() {
        return this.countrySelect;
    }

    getCountrySelectedOption = function() {
        return this.countrySelect.element(by.css('option:checked')).getText();
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
