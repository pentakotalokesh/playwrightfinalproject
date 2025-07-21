import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class UpcomingHondaBikesPage extends BasePage {
  //selectors
  upcomingTab: Locator;
  allupcomingBikesLink: Locator;
  hondaFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.upcomingTab = page.locator(".upcoming-bike-tab");
    this.allupcomingBikesLink = page.locator('[title="All Upcoming Bikes"]');
    this.hondaFilter = page.locator('[title="upcoming Honda bikes"]');
  }

  async navigateToUpcomingBikes() {
    await this.goto("https://www.zigwheels.com/");
    await this.upcomingTab.click();
    await this.allupcomingBikesLink.click();
  }
  async filterHondaBikes() {
    await this.clickElement(this.hondaFilter);
  }
  async filterHondaBikesByPrice() {
    let priceFilteredBikes = (await this.getFilteredBikes()).filter(
      (bike) => (parseInt(bike?.price ?? "") || 0) <= 400000
    );
    return priceFilteredBikes;
  }
  async getFilteredBikes() {
    let bikes = await this.page.$$eval("#modelList li", (items) =>
      items.map((item) => {
        return {
          modelname:
            item
              .querySelector('[data-track-label="model-name"]')
              ?.textContent?.trim() || "",

          price: item.getAttribute("data-price"),
          launchDate:
            item
              .querySelector(".clr-try")
              ?.textContent?.trim()
              .split(":")[1]
              ?.trim() || "",
        };
      })
    );
    return bikes;
  }
}
