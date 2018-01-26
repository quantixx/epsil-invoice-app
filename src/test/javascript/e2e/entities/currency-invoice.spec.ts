import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Currency e2e test', () => {

    let navBarPage: NavBarPage;
    let currencyDialogPage: CurrencyDialogPage;
    let currencyComponentsPage: CurrencyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Currencies', () => {
        navBarPage.goToEntity('currency-invoice');
        currencyComponentsPage = new CurrencyComponentsPage();
        expect(currencyComponentsPage.getTitle())
            .toMatch(/invoiceappApp.currency.home.title/);

    });

    it('should load create Currency dialog', () => {
        currencyComponentsPage.clickOnCreateButton();
        currencyDialogPage = new CurrencyDialogPage();
        expect(currencyDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.currency.home.createOrEditLabel/);
        currencyDialogPage.close();
    });

    it('should create and save Currencies', () => {
        currencyComponentsPage.clickOnCreateButton();
        currencyDialogPage.setEntityInput('entity');
        expect(currencyDialogPage.getEntityInput()).toMatch('entity');
        currencyDialogPage.setCurrencyInput('currency');
        expect(currencyDialogPage.getCurrencyInput()).toMatch('currency');
        currencyDialogPage.setAlphabeticCodeInput('alphabeticCode');
        expect(currencyDialogPage.getAlphabeticCodeInput()).toMatch('alphabeticCode');
        currencyDialogPage.setNumericCodeInput('5');
        expect(currencyDialogPage.getNumericCodeInput()).toMatch('5');
        currencyDialogPage.setMinorUnitInput('5');
        expect(currencyDialogPage.getMinorUnitInput()).toMatch('5');
        currencyDialogPage.setSymbolInput('symbol');
        expect(currencyDialogPage.getSymbolInput()).toMatch('symbol');
        currencyDialogPage.getActivatedInput().isSelected().then((selected) => {
            if (selected) {
                currencyDialogPage.getActivatedInput().click();
                expect(currencyDialogPage.getActivatedInput().isSelected()).toBeFalsy();
            } else {
                currencyDialogPage.getActivatedInput().click();
                expect(currencyDialogPage.getActivatedInput().isSelected()).toBeTruthy();
            }
        });
        currencyDialogPage.save();
        expect(currencyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CurrencyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-currency-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CurrencyDialogPage {
    modalTitle = element(by.css('h4#myCurrencyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    entityInput = element(by.css('input#field_entity'));
    currencyInput = element(by.css('input#field_currency'));
    alphabeticCodeInput = element(by.css('input#field_alphabeticCode'));
    numericCodeInput = element(by.css('input#field_numericCode'));
    minorUnitInput = element(by.css('input#field_minorUnit'));
    symbolInput = element(by.css('input#field_symbol'));
    activatedInput = element(by.css('input#field_activated'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEntityInput = function(entity) {
        this.entityInput.sendKeys(entity);
    }

    getEntityInput = function() {
        return this.entityInput.getAttribute('value');
    }

    setCurrencyInput = function(currency) {
        this.currencyInput.sendKeys(currency);
    }

    getCurrencyInput = function() {
        return this.currencyInput.getAttribute('value');
    }

    setAlphabeticCodeInput = function(alphabeticCode) {
        this.alphabeticCodeInput.sendKeys(alphabeticCode);
    }

    getAlphabeticCodeInput = function() {
        return this.alphabeticCodeInput.getAttribute('value');
    }

    setNumericCodeInput = function(numericCode) {
        this.numericCodeInput.sendKeys(numericCode);
    }

    getNumericCodeInput = function() {
        return this.numericCodeInput.getAttribute('value');
    }

    setMinorUnitInput = function(minorUnit) {
        this.minorUnitInput.sendKeys(minorUnit);
    }

    getMinorUnitInput = function() {
        return this.minorUnitInput.getAttribute('value');
    }

    setSymbolInput = function(symbol) {
        this.symbolInput.sendKeys(symbol);
    }

    getSymbolInput = function() {
        return this.symbolInput.getAttribute('value');
    }

    getActivatedInput = function() {
        return this.activatedInput;
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
