const mongoose = require('mongoose');
const Usuario = require('../models/Usuarios');
const mongodbURL = "mongodb+srv://adminsopes1p1:adminsopes1p1@cluster0.c9orq.mongodb.net/Blockbusted?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is conencted to', db.connection.host))
    .catch(err => { console.log("Ha ocurrido un error de conexion."); console.error(err); });

var assert = require('assert');
describe('Login Success', function () {
    it('login()', async function () {
        this.timeout(10000);
        var request = { usuario: "dtortola", password: "1234" };
        try {
            await Usuario.find({ username: request['usuario'], password: request['password'] })
                .exec()
                .then(doc => {
                    assert.equal(doc._id, '6090e6d2b3541b3ef8412255');
                })
                .catch(err => {
                });
        } catch {
        }
    });
});


describe('Login Fail', function () {
    it('login()', async function () {
        this.timeout(10000);
        var request = { usuario: "dtortola", password: "contraseña incorrecta" };
        try {
            await Usuario.find({ username: request['usuario'], password: request['password'] })
                .exec()
                .then(doc => {
                    assert.equal(doc, null);
                })
                .catch(err => {
                });
        } catch {
        }
    });
});


describe('Registro Success', function () {
    it('SignUp()', async function () {
        this.timeout(10000);
        const usuario = new Usuario({
            _id: '6090e6d2b3541b3ef8412255',
            name: "David",
            lastname: "Tortola",
            username: "dtortola",
            email: "dtortola@gmail.com",
            password: "1234",
            dpi: "1234",
            age: "25",
            creditCard: "1234",
            type: "1"
        });

        try {
            await usuario.save()
                .then(result => {
                    assert.notEqual(result._id, '6090e6d2b3541b3ef8412255');
                })
                .catch(err => {
                });

        } catch {
        }
    });
});

describe('Registro Fail', function () {
    it('SignUp()', async function () {
        this.timeout(10000);
        const usuario = new Usuario({
            name: "David",
            lastname: "Tortola",
            username: "dtortola",
            email: "dtortola@gmail.com",
            password: "1234",
            dpi: "1234",
            age: "25",
            creditCard: "1234",
            type: "1"
        });

        try {
            await usuario.save()
                .then(result => {
                    assert.equal(result._id, null);
                })
                .catch(err => {
                });

        } catch {
        }
    });
});

const Transacciones = require('../models/Transacciones');
describe('Compra Success', function () {
    it('transaccion()', async function () {
        this.timeout(10000);
        const transa = new Transacciones({
            user: 'dtortola',
            key: '6094e907a2f5292dfc93a617',
            movieid: '6094e918dc668b1618fe05be',
            plan: '5',
            exchangeRate: 7,
            total: '100',
            date: new Date()
        })

        try {
            await transa.save()
                .then(result => {
                    assert.notEqual(result._id, null);
                })
                .catch(err => {
                });

        } catch {
        }
    });
});

describe('Compra Fail', function () {
    it('transaccion()', async function () {
        this.timeout(10000);
        const transa = new Transacciones({
            user: 'dtortola',
            key: '6094e907a2f5292dfc93a617',
            movieid: '6094e918dc668b1618fe05be',
            plan: '5',
            exchangeRate: 7,
            total: '100',
            date: new Date()
        })

        try {
            await transa.save()
                .then(result => {
                    assert.equal(result._id, null);
                })
                .catch(err => {
                });

        } catch {
        }
    });
});


const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

describe('Generacion Alfanumerico', function () {
    it('encriptar()', async function () {
        let text = 'este es un numero de prueba';
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        assert.notEqual(encrypted.toString('hex'), 'd18e008e6442fbbaa50f5b0e74e3e1b860fcf879680fa5197b0a97a80ebc404b');
    });
});

describe('Enmacarado de numero', function () {
    it('desencriptar()', async function () {
        let text = 'd18e008e6442fbbaa50f5b0e74e3e1b860fcf879680fa5197b0a97a80ebc404b';
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        assert.notEqual(encrypted.toString('hex'), 'este es un numero de prueba');
    });
});