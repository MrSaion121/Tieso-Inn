import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";
import assert from "assert";

let driver;

Given("I open the login page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  // eslint-disable-next-line no-undef
  await driver.get(`http://localhost:${process.env.PORT | 3000}/login`);
});

When("I fill in the login form with valid data", async function () {
  await driver.wait(until.titleContains("Login - TiesoInn"), 60000);
  const email = await driver.findElement(By.id("email"));
  const password = await driver.findElement(By.id("password"));
  const submitButton = await driver.findElement(By.id("submit-button"));

  await email.sendKeys("juan@perez.com");
  await password.sendKeys("Juan@123");
  submitButton.click();
});

Then("I should be redirected to the home page", async function () {
  await driver.wait(until.titleContains("Tieso Inn"), 60000);
  const title = await driver.getTitle();
  assert.strictEqual(title, "Tieso Inn");
  await driver.quit();
});