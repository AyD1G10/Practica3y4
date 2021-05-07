import { RegisterPage } from './registro.po';
import { browser } from 'protractor';
describe('Register tests', () => {
    let page: RegisterPage;
    beforeEach(() => {
        page = new RegisterPage();
        page.navigateTo();        
    });
    it('Register form should be valid', () => {
        page.getNombreTextbox().sendKeys('Aaron');
        page.getApellidoTextbox().sendKeys('Juarez');
        page.getUsuarioTextbox().sendKeys('Ajuarez');
        page.getDPITextbox().sendKeys('296359');
        page.getEmailTextBox().sendKeys('ajuarez@ejemplo.com');
        page.getPasswordTextbox().sendKeys('123');
        page.getConfirmPasswordTextbox().sendKeys('123');
        page.getEdadTextBox().sendKeys('25');
        page.getTarjeta().sendKeys('123456');
        let form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-valid');
    });

    
   
});