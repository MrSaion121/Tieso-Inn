import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";
import assert from "assert";

let driver;

Given("I am logged in", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  // eslint-disable-next-line no-undef
  await driver.get(`http://localhost:${process.env.PORT || 3000}/login`);

  await driver.wait(until.titleContains("Login - TiesoInn"), 60000);
  const email = await driver.findElement(By.id("email"));
  const password = await driver.findElement(By.id("password"));
  const submitButton = await driver.findElement(By.id("submit-button"));

  await email.sendKeys("juan@perez.com");
  await password.sendKeys("Juan@123");
  await submitButton.click();

  await driver.wait(until.titleContains("Tieso Inn"), 10000);
});

When("I enter the support chat", async function () {
  const supportLink = await driver.wait(until.elementLocated(By.id("supportChatLink")), 5000);
  await supportLink.click();
  await driver.wait(until.elementLocated(By.id("message")), 5000);
});

When("I write {string} and send it", async function (message) {
  const input = await driver.findElement(By.id("message"));
  await input.clear();
  await input.sendKeys(message);
  const button = await driver.findElement(By.id("trigger"));
  await button.click();
});

Then("I should see the message {string} in the chat", async function (expectedMessage) {
  await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), "${expectedMessage}")]`)), 5000);
  const mensaje = await driver.findElement(By.xpath(`//*[contains(text(), "${expectedMessage}")]`));
  const texto = await mensaje.getText();
  assert.ok(texto.includes(expectedMessage));
  await driver.quit();
});

