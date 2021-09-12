import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
let downloadFolder = `${process.cwd()}`
const filename = 'TA_PRECO_MEDICAMENTO.csv'

console.log(downloadFolder)

async function test() {
    let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().setUserPreferences(
        { "download.default_directory": downloadFolder}
    )).build();
    await driver.get(`https://dados.anvisa.gov.br/dados/${filename}`); // TROCAR
}

test();