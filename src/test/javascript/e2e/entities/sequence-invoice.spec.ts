import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Sequence e2e test', () => {

    let navBarPage: NavBarPage;
    let sequenceDialogPage: SequenceDialogPage;
    let sequenceComponentsPage: SequenceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sequences', () => {
        navBarPage.goToEntity('sequence-invoice');
        sequenceComponentsPage = new SequenceComponentsPage();
        expect(sequenceComponentsPage.getTitle())
            .toMatch(/invoiceappApp.sequence.home.title/);

    });

    it('should load create Sequence dialog', () => {
        sequenceComponentsPage.clickOnCreateButton();
        sequenceDialogPage = new SequenceDialogPage();
        expect(sequenceDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.sequence.home.createOrEditLabel/);
        sequenceDialogPage.close();
    });

   /* it('should create and save Sequences', () => {
        sequenceComponentsPage.clickOnCreateButton();
        sequenceDialogPage.docTypeSelectLastOption();
        sequenceDialogPage.setNextInput('5');
        expect(sequenceDialogPage.getNextInput()).toMatch('5');
        sequenceDialogPage.tenantSelectLastOption();
        sequenceDialogPage.familySelectLastOption();
        sequenceDialogPage.save();
        expect(sequenceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SequenceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-sequence-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SequenceDialogPage {
    modalTitle = element(by.css('h4#mySequenceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    docTypeSelect = element(by.css('select#field_docType'));
    nextInput = element(by.css('input#field_next'));
    tenantSelect = element(by.css('select#field_tenant'));
    familySelect = element(by.css('select#field_family'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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
    setNextInput = function(next) {
        this.nextInput.sendKeys(next);
    }

    getNextInput = function() {
        return this.nextInput.getAttribute('value');
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
