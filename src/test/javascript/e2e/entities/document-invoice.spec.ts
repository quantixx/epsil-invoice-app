import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Document e2e test', () => {

    let navBarPage: NavBarPage;
    let documentDialogPage: DocumentDialogPage;
    let documentComponentsPage: DocumentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Documents', () => {
        navBarPage.goToEntity('document-invoice');
        documentComponentsPage = new DocumentComponentsPage();
        expect(documentComponentsPage.getTitle())
            .toMatch(/invoiceappApp.document.home.title/);

    });

    it('should load create Document dialog', () => {
        documentComponentsPage.clickOnCreateButton();
        documentDialogPage = new DocumentDialogPage();
        expect(documentDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.document.home.createOrEditLabel/);
        documentDialogPage.close();
    });

    it('should create and save Documents', () => {
        documentComponentsPage.clickOnCreateButton();
        documentDialogPage.setNameInput('name');
        expect(documentDialogPage.getNameInput()).toMatch('name');
        documentDialogPage.setDescriptionInput('description');
        expect(documentDialogPage.getDescriptionInput()).toMatch('description');
        documentDialogPage.documentTypeSelectLastOption();
        documentDialogPage.setDocumentSizeInput('5');
        expect(documentDialogPage.getDocumentSizeInput()).toMatch('5');
        documentDialogPage.setDocusignEnvelopeIdInput('docusignEnvelopeId');
        expect(documentDialogPage.getDocusignEnvelopeIdInput()).toMatch('docusignEnvelopeId');
        documentDialogPage.setUrlInput('url');
        expect(documentDialogPage.getUrlInput()).toMatch('url');
        documentDialogPage.setContentTypeInput('contentType');
        expect(documentDialogPage.getContentTypeInput()).toMatch('contentType');
        documentDialogPage.setCreatedOnInput(12310020012301);
        expect(documentDialogPage.getCreatedOnInput()).toMatch('2001-12-31T02:30');
        documentDialogPage.languageSelectLastOption();
        documentDialogPage.save();
        expect(documentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DocumentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-document-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DocumentDialogPage {
    modalTitle = element(by.css('h4#myDocumentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    documentTypeSelect = element(by.css('select#field_documentType'));
    documentSizeInput = element(by.css('input#field_documentSize'));
    docusignEnvelopeIdInput = element(by.css('input#field_docusignEnvelopeId'));
    urlInput = element(by.css('input#field_url'));
    contentTypeInput = element(by.css('input#field_contentType'));
    createdOnInput = element(by.css('input#field_createdOn'));
    languageSelect = element(by.css('select#field_language'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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

    setDocumentTypeSelect = function(documentType) {
        this.documentTypeSelect.sendKeys(documentType);
    }

    getDocumentTypeSelect = function() {
        return this.documentTypeSelect.element(by.css('option:checked')).getText();
    }

    documentTypeSelectLastOption = function() {
        this.documentTypeSelect.all(by.tagName('option')).last().click();
    }
    setDocumentSizeInput = function(documentSize) {
        this.documentSizeInput.sendKeys(documentSize);
    }

    getDocumentSizeInput = function() {
        return this.documentSizeInput.getAttribute('value');
    }

    setDocusignEnvelopeIdInput = function(docusignEnvelopeId) {
        this.docusignEnvelopeIdInput.sendKeys(docusignEnvelopeId);
    }

    getDocusignEnvelopeIdInput = function() {
        return this.docusignEnvelopeIdInput.getAttribute('value');
    }

    setUrlInput = function(url) {
        this.urlInput.sendKeys(url);
    }

    getUrlInput = function() {
        return this.urlInput.getAttribute('value');
    }

    setContentTypeInput = function(contentType) {
        this.contentTypeInput.sendKeys(contentType);
    }

    getContentTypeInput = function() {
        return this.contentTypeInput.getAttribute('value');
    }

    setCreatedOnInput = function(createdOn) {
        this.createdOnInput.sendKeys(createdOn);
    }

    getCreatedOnInput = function() {
        return this.createdOnInput.getAttribute('value');
    }

    languageSelectLastOption = function() {
        this.languageSelect.all(by.tagName('option')).last().click();
    }

    languageSelectOption = function(option) {
        this.languageSelect.sendKeys(option);
    }

    getLanguageSelect = function() {
        return this.languageSelect;
    }

    getLanguageSelectedOption = function() {
        return this.languageSelect.element(by.css('option:checked')).getText();
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
