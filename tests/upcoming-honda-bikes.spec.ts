import { expect, test } from "@playwright/test";
import { UpcomingHondaBikesPage } from "../pages/upcoming-honda-bikes";
import { saveToJson } from "../utils/fileHelper";

let filteredHondaBikes: Array<object>;
let priceFiltered: Array<object>;

test.describe("Upcoming Honda Bikes Under 4 Lakhs", () => {
  test("Navigating to upcoming Bikes Page of Honda", async ({ page }) => {
    const bikesPage = new UpcomingHondaBikesPage(page);
    await bikesPage.navigateToUpcomingBikes();
    await bikesPage.filterHondaBikes();
    await expect(page).toHaveTitle(/Honda/);
  });
  test("Filter upcoming honda bikes and save it json", async ({ page }) => {
    const bikesPage = new UpcomingHondaBikesPage(page);
    //Navigation
    await bikesPage.navigateToUpcomingBikes();
    //Click on honda
    await bikesPage.filterHondaBikes();
    //get filtered bikes in array
    filteredHondaBikes = await bikesPage.getFilteredBikes();
    console.log(filteredHondaBikes);
    //save to file as json data
    await saveToJson(filteredHondaBikes, "scraped_data/bikesData.json");
    //filter less than 4 Lakhs
    priceFiltered = await bikesPage.filterHondaBikesByPrice();
    await saveToJson(priceFiltered, "scraped_data/bikesLessthan4Lakhs.json");
    console.log(priceFiltered);
  });
  test("Verify launch dates", async ({ page }) => {
    await page.goto("https://www.zigwheels.com/upcoming-honda-bikes");
    const dates = await page.locator(".b-launchDate").allTextContents();
    dates.forEach((date) => console.log("Launch Date:", date));
  });
  test("Check image thumbnails", async ({ page }) => {
    await page.goto("https://www.zigwheels.com/upcoming-honda-bikes");
    const images = page.locator(".lazy_image.i-b.c-p");
    expect(await images.count()).toBeGreaterThan(0);
  });
  test("Capture screenshot of listing", async ({ page }) => {
    await page.goto("https://www.zigwheels.com/upcoming-honda-bikes");
    await page.screenshot({ path: "screenshots/upcoming-bikes.png" });
  });
  //check for jenkins
});
