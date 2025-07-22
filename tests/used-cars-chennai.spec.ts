import { expect, test } from "@playwright/test";
import { UsedCars } from "../pages/used-cars";
import { saveToJson } from "../utils/fileHelper";

let filteredObjectsCars: Array<object>;

test.describe("Used cars in chennai", () => {   
  test("Go to Used Cars page", async ({ page }) => {
    const usedCarsObject = new UsedCars(page);
    await usedCarsObject.navigateToUsedCars();
    await expect(page).toHaveTitle(/Used Cars/);
  });
  test("Extract popular car models list", async ({ page }) => {
    const usedCarsObject = new UsedCars(page);
    await usedCarsObject.navigateToUsedCars();
    await usedCarsObject.getPopularModels();
  });
  test("Filter all popular models of cars in Chennai", async ({ page }) => {
    const usedCarsObject = new UsedCars(page);

    //Navigate to used Cars
    await usedCarsObject.navigateToUsedCars();
    //click on Chennai city to filter
    await usedCarsObject.filterUsedCarsCityChennai();
    //filter cars by popular models
    filteredObjectsCars = await usedCarsObject.filterCarsByPopularModels();
    //save data to json file
    await saveToJson(filteredObjectsCars, "scraped_data/carsList.json");
    //completed
  });
  test("Take screenshot of car models section", async ({ page }) => {
    const usedCarsObject = new UsedCars(page);

    //Navigate to used Cars
    await usedCarsObject.navigateToUsedCars();
    // Wait for the popular models section to appear
    const modelSection = page.locator(".popularModels");
    await expect(modelSection).toBeVisible();

    // Capture the screenshot
    await modelSection.screenshot({
      path: "screenshots/popular-car-models.png",
    });

    console.log("📸 Screenshot saved: screenshots/popular-car-models.png");
  });
});
