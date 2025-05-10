import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";
import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line no-undef
const PORT  = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;
let driver;

setDefaultTimeout(6*1000);

Given('I open the main page', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  // eslint-disable-next-line no-undef
  await driver.get(baseUrl);
});

When('I click on dropdown Ingreso', async function () {
  await driver.wait(until.titleContains('Tieso Inn'));
  await driver.findElement(By.id('dropdownId')).click();
});

When('I click on button Registro', async function () {
  await driver.findElement(By.id('option-2')).click();
});

When('I fill the sign up form with a registered email', async function () {
  const registerForm = await driver.findElement(By.id('register-form'));
  await driver.wait(until.elementIsVisible(registerForm));
  const currentUrl = await driver.getCurrentUrl();
  const expectedUrl = `${baseUrl}/register`;
  assert.strictEqual(currentUrl, expectedUrl);
  const nameInput = await driver.findElement(By.id('name'));
  const emailInput = await driver.findElement(By.id('email'));
  const passwordInput = await driver.findElement(By.id('password'));
  const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
  const cellPhoneInput = await driver.findElement(By.id('cellphone'));
  await nameInput.sendKeys('Juan Pérez');
  await emailInput.sendKeys('juan@perez.com');
  await passwordInput.sendKeys('Password123@');
  await confirmPasswordInput.sendKeys('Password123@');
  await cellPhoneInput.sendKeys('3347937629');
});

When('I submit the sign up form', async function () {
  const registerForm = await driver.findElement(By.id('register-form'));
  registerForm.submit();
});

Then('I get an error due to existing email', async function () {
  await driver.wait(until.alertIsPresent());
  const alert = await driver.switchTo().alert();
  const alertText = await alert.getText();
  assert.strictEqual(alertText, 'Error al registrar: "Este email ya se esta usando"');
  await alert.accept();
  await driver.quit();
});
