import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  //Navigates to url
  async goto(url: string) {
    await this.page.goto(url);
  }
  // To get the title of page
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  //wait for element to visible
  async waitForElement(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: "visible", timeout });
  }
  //check method for element visible or not
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
  //method to take the screen shot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `${name}.png` });
  }
  //method to click on element
  async clickElement(selector: Locator): Promise<void> {
    // const element: Locator = this.page.locator(selector);
    await selector.click();
  }

  async fillInput(selector: string, value: string): Promise<void> {
    const input: Locator = this.page.locator(selector);
    await input.fill(value);
  }
}
