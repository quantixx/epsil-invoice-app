import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Language e2e test', () => {

    let navBarPage: NavBarPage;
    let languageDialogPage: LanguageDialogPage;
    let languageComponentsPage: LanguageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Languages', () => {
        navBarPage.goToEntity('language-invoice');
        languageComponentsPage = new LanguageComponentsPage();
        expect(languageComponentsPage.getTitle())
            .toMatch(/invoiceappApp.language.home.title/);

    });

    it('should load create Language dialog', () => {
        languageComponentsPage.clickOnCreateButton();
        languageDialogPage = new LanguageDialogPage();
        expect(languageDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.language.home.createOrEditLabel/);
        languageDialogPage.close();
    });

    it('should create and save Languages', () => {
        languageComponentsPage.clickOnCreateButton();
        languageDialogPage.setAlpha3bInput('alpha3b');
        expect(languageDialogPage.getAlpha3bInput()).toMatch('alpha3b');
        languageDialogPage.setAlpha2Input('alpha2');
        expect(languageDialogPage.getAlpha2Input()).toMatch('alpha2');
        languageDialogPage.setNameInput('name');
        expect(languageDialogPage.getNameInput()).toMatch('name');
        languageDialogPage.setFlag32Input('flag32');
        expect(languageDialogPage.getFlag32Input()).toMatch('flag32');
        languageDialogPage.setFlag128Input('flag128');
        expect(languageDialogPage.getFlag128Input()).toMatch('flag128');
        languageDialogPage.getActivatedInput().isSelected().then((selected) => {
            if (selected) {
                languageDialogPage.getActivatedInput().click();
                expect(languageDialogPage.getActivatedInput().isSelected()).toBeFalsy();
            } else {
                languageDialogPage.getActivatedInput().click();
                expect(languageDialogPage.getActivatedInput().isSelected()).toBeTruthy();
            }
        });
        languageDialogPage.save();
        expect(languageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LanguageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-language-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LanguageDialogPage {
    modalTitle = element(by.css('h4#myLanguageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    alpha3bInput = element(by.css('input#field_alpha3b'));
    alpha2Input = element(by.css('input#field_alpha2'));
    nameInput = element(by.css('input#field_name'));
    flag32Input = element(by.css('input#field_flag32'));
    flag128Input = element(by.css('input#field_flag128'));
    activatedInput = element(by.css('input#field_activated'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAlpha3bInput = function(alpha3b) {
        this.alpha3bInput.sendKeys(alpha3b);
    }

    getAlpha3bInput = function() {
        return this.alpha3bInput.getAttribute('value');
    }

    setAlpha2Input = function(alpha2) {
        this.alpha2Input.sendKeys(alpha2);
    }

    getAlpha2Input = function() {
        return this.alpha2Input.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
