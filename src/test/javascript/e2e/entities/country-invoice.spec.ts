import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Country e2e test', () => {

    let navBarPage: NavBarPage;
    let countryDialogPage: CountryDialogPage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country-invoice');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle())
            .toMatch(/invoiceappApp.country.home.title/);

    });

    it('should load create Country dialog', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage = new CountryDialogPage();
        expect(countryDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.country.home.createOrEditLabel/);
        countryDialogPage.close();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage.setIso2Input('iso2');
        expect(countryDialogPage.getIso2Input()).toMatch('iso2');
        countryDialogPage.setIso3Input('iso3');
        expect(countryDialogPage.getIso3Input()).toMatch('iso3');
        countryDialogPage.setM49Input('5');
        expect(countryDialogPage.getM49Input()).toMatch('5');
        countryDialogPage.setNameInput('name');
        expect(countryDialogPage.getNameInput()).toMatch('name');
        countryDialogPage.setOfficialNameEnInput('officialNameEn');
        expect(countryDialogPage.getOfficialNameEnInput()).toMatch('officialNameEn');
        countryDialogPage.setOfficialNameFrInput('officialNameFr');
        expect(countryDialogPage.getOfficialNameFrInput()).toMatch('officialNameFr');
        countryDialogPage.setDialInput('dial');
        expect(countryDialogPage.getDialInput()).toMatch('dial');
        countryDialogPage.continentSelectLastOption();
        countryDialogPage.setTldInput('tld');
        expect(countryDialogPage.getTldInput()).toMatch('tld');
        countryDialogPage.setFlag32Input('flag32');
        expect(countryDialogPage.getFlag32Input()).toMatch('flag32');
        countryDialogPage.setFlag128Input('flag128');
        expect(countryDialogPage.getFlag128Input()).toMatch('flag128');
        countryDialogPage.setLatitudeInput('latitude');
        expect(countryDialogPage.getLatitudeInput()).toMatch('latitude');
        countryDialogPage.setLongitudeInput('longitude');
        expect(countryDialogPage.getLongitudeInput()).toMatch('longitude');
        countryDialogPage.setZoomInput('5');
        expect(countryDialogPage.getZoomInput()).toMatch('5');
        countryDialogPage.save();
        expect(countryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CountryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-country-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CountryDialogPage {
    modalTitle = element(by.css('h4#myCountryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    iso2Input = element(by.css('input#field_iso2'));
    iso3Input = element(by.css('input#field_iso3'));
    m49Input = element(by.css('input#field_m49'));
    nameInput = element(by.css('input#field_name'));
    officialNameEnInput = element(by.css('input#field_officialNameEn'));
    officialNameFrInput = element(by.css('input#field_officialNameFr'));
    dialInput = element(by.css('input#field_dial'));
    continentSelect = element(by.css('select#field_continent'));
    tldInput = element(by.css('input#field_tld'));
    flag32Input = element(by.css('input#field_flag32'));
    flag128Input = element(by.css('input#field_flag128'));
    latitudeInput = element(by.css('input#field_latitude'));
    longitudeInput = element(by.css('input#field_longitude'));
    zoomInput = element(by.css('input#field_zoom'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIso2Input = function(iso2) {
        this.iso2Input.sendKeys(iso2);
    }

    getIso2Input = function() {
        return this.iso2Input.getAttribute('value');
    }

    setIso3Input = function(iso3) {
        this.iso3Input.sendKeys(iso3);
    }

    getIso3Input = function() {
        return this.iso3Input.getAttribute('value');
    }

    setM49Input = function(m49) {
        this.m49Input.sendKeys(m49);
    }

    getM49Input = function() {
        return this.m49Input.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setOfficialNameEnInput = function(officialNameEn) {
        this.officialNameEnInput.sendKeys(officialNameEn);
    }

    getOfficialNameEnInput = function() {
        return this.officialNameEnInput.getAttribute('value');
    }

    setOfficialNameFrInput = function(officialNameFr) {
        this.officialNameFrInput.sendKeys(officialNameFr);
    }

    getOfficialNameFrInput = function() {
        return this.officialNameFrInput.getAttribute('value');
    }

    setDialInput = function(dial) {
        this.dialInput.sendKeys(dial);
    }

    getDialInput = function() {
        return this.dialInput.getAttribute('value');
    }

    setContinentSelect = function(continent) {
        this.continentSelect.sendKeys(continent);
    }

    getContinentSelect = function() {
        return this.continentSelect.element(by.css('option:checked')).getText();
    }

    continentSelectLastOption = function() {
        this.continentSelect.all(by.tagName('option')).last().click();
    }
    setTldInput = function(tld) {
        this.tldInput.sendKeys(tld);
    }

    getTldInput = function() {
        return this.tldInput.getAttribute('value');
    }

    setFlag32Input = function(flag32) {
        this.flag32Input.sendKeys(flag32);
    }

    getFlag32Input = function() {
        return this.flag32Input.getAttribute('value');
    }

    setFlag128Input = function(flag128) {
        this.flag128Input.sendKeys(flag128);
    }

    getFlag128Input = function() {
        return this.flag128Input.getAttribute('value');
    }

    setLatitudeInput = function(latitude) {
        this.latitudeInput.sendKeys(latitude);
    }

    getLatitudeInput = function() {
        return this.latitudeInput.getAttribute('value');
    }

    setLongitudeInput = function(longitude) {
        this.longitudeInput.sendKeys(longitude);
    }

    getLongitudeInput = function() {
        return this.longitudeInput.getAttribute('value');
    }

    setZoomInput = function(zoom) {
        this.zoomInput.sendKeys(zoom);
    }

    getZoomInput = function() {
        return this.zoomInput.getAttribute('value');
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
