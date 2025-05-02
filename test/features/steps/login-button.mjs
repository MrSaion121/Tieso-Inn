import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";
import assert from 'assert';

let driver;

Given('I open main page', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  // eslint-disable-next-line no-undef
  await driver.get(`http://localhost:${process.env.PORT | 3000}`);
});

When('I click on dropdown Ingreso, then on button Ingresar', async function () {
  await driver.wait(until.titleContains('Tieso Inn'), 60000);
  await driver.findElement(By.id('dropdownId')).click();
  await driver.findElement(By.id('option-1')).click();
});

Then('I should see the login form', async function () {
  await driver.wait(until.titleContains('Login'), 60000);
  const title = await driver.getTitle();
  assert.strictEqual(title, 'Login - TiesoInn');
  await driver.quit();
});
