import { Given, When, Then } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

let driver;

Given('I am logged in for logout', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  // eslint-disable-next-line no-undef
  await driver.get(`http://localhost:${process.env.PORT | 3000}/login`);

  await driver.findElement(By.name('email')).sendKeys('rodrigo@pruebas.com');
  await driver.findElement(By.name('password')).sendKeys('Hola123@');
  await driver.findElement(By.css('button[type="submit"]')).click();

  await driver.wait(until.elementLocated(By.id('dropdownId')), 5000);
});

When('I click on the logout link', async function () {
  const dropdownToggle = await driver.findElement(By.css('.nav-link.dropdown-toggle'));
  await dropdownToggle.click();

  const logoutLink = await driver.wait(
    until.elementLocated(By.partialLinkText('Cerrar')),
    5000
  );
  await logoutLink.click();
});


Then('I should see the login button or link', async function () {
  const loginLink = await driver.wait(
    until.elementLocated(By.linkText('Ingreso')),
    5000
  );
  assert.ok(await loginLink.isDisplayed());
  await driver.quit();
});
