import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
export class UsedCars extends BasePage {
  //Locators
  navMoreLocator: Locator;
  usedCarsLocator: Locator;
  chennaiFilterLink: Locator;
  listPopularBrands: Locator;

  constructor(page: Page) {
    super(page);
    this.navMoreLocator = this.page.locator(".c-p.icon-down-arrow");
    this.usedCarsLocator = this.page.locator("[title='Used Cars']");
    this.chennaiFilterLink = this.page.getByTitle("Chennai");
    this.listPopularBrands = this.page.locator(".popularModels li");
  }
  async navigateToUsedCars() {
    await this.goto("https://www.zigwheels.com/");
    await this.clickElement(this.navMoreLocator);
    await this.clickElement(this.usedCarsLocator);
  }
  async filterUsedCarsCityChennai() {
    await this.clickElement(this.chennaiFilterLink);
  }
  async getPopularModels() {
    for (let i = 0; i < (await this.listPopularBrands.count()); i++) {
      console.log(await this.listPopularBrands.nth(i).textContent());
    }
  }
  async filterCarsByPopularModels() {
    const result: {
      [brand: string]: { model_name: string | null; price: string | null }[];
    }[] = [];
    let cars_list_count = 0;
    for (let i = 0; i < (await this.listPopularBrands.count()); i++) {
      const list_cars_brand: {
        model_name: string | null;
        price: string | null;
      }[] = [];
      await this.listPopularBrands.nth(i).locator("label").click();
      await this.page.waitForTimeout(2000);
      let brand_name = (
        (await this.listPopularBrands.nth(i)?.textContent()) || ""
      ).trim();
      let listAvailibleCars = this.page.locator(
        "#data-set-body>>div.zw-sr-searchTarget"
      );
      cars_list_count = await listAvailibleCars.count();

      // console.log(cars_list_count); debugging purpose
      for (let i = 0; i < cars_list_count; i++) {
        const mainElement = listAvailibleCars
          .nth(i)
          .locator(".pl-30.zw-sr-paddingLeft > *");
        // console.log(await mainElement.nth(0).textContent());
        const model_name = await mainElement.nth(0).textContent();
        const price = await mainElement.nth(0).getAttribute("data-price");
        list_cars_brand.push({ model_name: model_name, price: price });
        // console.log(await listAvailibleCars.nth(i).textContent());
      }
      result.push({
        [brand_name]: list_cars_brand,
      });
      //remove the check box
      await this.listPopularBrands.nth(i).locator("label").click();
    }
    //   console.log(await this.listPopularBrands.count());
    console.log(JSON.stringify(result, null, 2));
    // saveJsonData(result, "src/outputData/usedCars.json");
    return result;
  }
}
