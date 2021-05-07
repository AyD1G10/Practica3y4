import { LoginPage } from './login.po';
import { browser } from 'protractor';
describe('Login tests', () => {
    let page: LoginPage;
    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();        
    });
    it('Login form should be valid', () => {
        page.getEmailTextbox().sendKeys('aa');
        page.getPasswordTextbox().sendKeys('123');
        let form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-valid');
    });

    it('Should set email value to local storage', () => {
        page.getEmailTextbox().sendKeys('aa');
        page.getPasswordTextbox().sendKeys('123');

        page.getSubmitButton().click();
        browser.sleep(1000);
        var valLocalStorage:any= browser.executeScript("return window.localStorage.getItem('UsuarioLogueado');");
        expect<any>(valLocalStorage).toContain('aa');
    });

   
});