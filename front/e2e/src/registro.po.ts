import { browser, by, element } from 'protractor';
export class RegisterPage {
    navigateTo(){
        return browser.get('/RegistrarUsuario');
    }
    getNombreTextbox() {
        return element(by.name('nombre'));
    }
    getApellidoTextbox() {
        return element(by.name('apellido'));
    }
    getUsuarioTextbox() {
        return element(by.name('usuario'));
    }
    getDPITextbox(){
        return element(by.name('dpi'));
    }
    getEmailTextBox(){
        return element(by.name('email'));
    }
    getPasswordTextbox(){
        return element(by.name('password'));
    }
    getConfirmPasswordTextbox(){
        return element(by.name('confirmarPassword'));
    }
    getEdadTextBox(){
        return element(by.name('edad'));
    }
    getTarjeta(){
        return element(by.name('tarjeta'));
    }
    getForm(){
        return element(by.css('#registroForm'));
    }

    getSubmitButton(){
        return element(by.css('#btnSubmit'));
    }
}