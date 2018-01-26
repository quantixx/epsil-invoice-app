import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Event e2e test', () => {

    let navBarPage: NavBarPage;
    let eventDialogPage: EventDialogPage;
    let eventComponentsPage: EventComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Events', () => {
        navBarPage.goToEntity('event-invoice');
        eventComponentsPage = new EventComponentsPage();
        expect(eventComponentsPage.getTitle())
            .toMatch(/invoiceappApp.event.home.title/);

    });

    it('should load create Event dialog', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage = new EventDialogPage();
        expect(eventDialogPage.getModalTitle())
            .toMatch(/invoiceappApp.event.home.createOrEditLabel/);
        eventDialogPage.close();
    });

   /* it('should create and save Events', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage.setSlugInput('slug');
        expect(eventDialogPage.getSlugInput()).toMatch('slug');
        eventDialogPage.setNameInput('name');
        expect(eventDialogPage.getNameInput()).toMatch('name');
        eventDialogPage.getVirtualInput().isSelected().then((selected) => {
            if (selected) {
                eventDialogPage.getVirtualInput().click();
                expect(eventDialogPage.getVirtualInput().isSelected()).toBeFalsy();
            } else {
                eventDialogPage.getVirtualInput().click();
                expect(eventDialogPage.getVirtualInput().isSelected()).toBeTruthy();
            }
        });
        eventDialogPage.setStartsOnInput('2000-12-31');
        expect(eventDialogPage.getStartsOnInput()).toMatch('2000-12-31');
        eventDialogPage.setEndsOnInput('2000-12-31');
        expect(eventDialogPage.getEndsOnInput()).toMatch('2000-12-31');
        eventDialogPage.tenantSelectLastOption();
        eventDialogPage.save();
        expect(eventDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('inv-event-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EventDialogPage {
    modalTitle = element(by.css('h4#myEventLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    slugInput = element(by.css('input#field_slug'));
    nameInput = element(by.css('input#field_name'));
    virtualInput = element(by.css('input#field_virtual'));
    startsOnInput = element(by.css('input#field_startsOn'));
    endsOnInput = element(by.css('input#field_endsOn'));
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

    getVirtualInput = function() {
        return this.virtualInput;
    }
    setStartsOnInput = function(startsOn) {
        this.startsOnInput.sendKeys(startsOn);
    }

    getStartsOnInput = function() {
        return this.startsOnInput.getAttribute('value');
    }

    setEndsOnInput = function(endsOn) {
        this.endsOnInput.sendKeys(endsOn);
    }

    getEndsOnInput = function() {
        return this.endsOnInput.getAttribute('value');
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
