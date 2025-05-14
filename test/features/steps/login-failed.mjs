import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until, Key } from "selenium-webdriver";
import assert from "assert";
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line no-undef
const PORT  = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;
let driver;

Given("I visit the home page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  // Go to home page
  await driver.get(baseUrl);
});

When("I click the dropdown button", async function () {
  // Click dropdown button
  const dropdown = await driver.findElement(By.id("dropdownId"));
  await dropdown.click();
});

When("I select the login option", async function () {
  // Select login option
  const option = await driver.findElement(By.id("option-1"));
  await option.sendKeys(Key.ENTER);
});

When("I should be on the login page", async function () {
  // Assert: Check URL is login page
  await driver.wait(until.urlContains("/login"), 10000);
  const url = await driver.getCurrentUrl();
  assert.ok(url.endsWith("/login"), "Should be on login page");
  await driver.sleep(1000);
});

When("I fill in the login form with invalid data", async function () {
  await driver.wait(until.titleContains("Login - TiesoInn"), 60000);
  const email = await driver.findElement(By.id("email"));
  const password = await driver.findElement(By.id("password"));
  const submitButton = await driver.findElement(By.id("submit-button"));

  // Mock: Use invalid credentials
  await email.sendKeys("wrong@user.com");
  await password.sendKeys("WrongPassword");
  submitButton.click();
  await driver.sleep(1000);
});

Then("I should see an error message for failed login", async function () {
  // Assert: Wait for JS alert with error message
  await driver.wait(until.alertIsPresent(), 10000);
  const alert = await driver.switchTo().alert();
  const alertText = await alert.getText();
  assert.ok(
    alertText.includes("Error: El correo no existe"),
    "Expected JS alert with 'Error: El correo no existe'"
  );
  await driver.sleep(1000);
  await alert.accept();
  await driver.quit();
});
