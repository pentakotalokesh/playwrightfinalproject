import { test, expect } from "@playwright/test";

test("Login with Google using invalid credentials", async ({ page }) => {
  await page.goto("https://www.zigwheels.com/");
  await page.waitForSelector(".h-sid.h-sid-s", { timeout: 10000 });
  await page.locator(".h-sid.h-sid-s").click();

  // Wait for Google login button to be visible
  const googleBtn = page.locator(
    "[data-track-label='Popup_Login/Register_with_Google']"
  );  
  await expect(googleBtn).toBeVisible({ timeout: 10000 });

  // Listen for popup before clicking
  const popupPromise = page.waitForEvent("popup", { timeout: 15000 });
  await googleBtn.click();
  const newPage = await popupPromise;

  await newPage.waitForLoadState("domcontentloaded");

  // Wait for email textbox
  const emailBox = await newPage.waitForSelector('input[type="email"]', {
    timeout: 10000,
  });
  expect(emailBox).not.toBeNull();
  expect(await emailBox.isVisible()).toBe(true);
  await emailBox.fill("djksndfjsh@jkj");

  // Wait for and click the "Next" button
  const nextButton = await newPage.waitForSelector('button:has-text("Next")', {
    timeout: 10000,
  });
  expect(await nextButton.isVisible()).toBe(true);
  await nextButton.click();

  // Screenshot for debugging
  await newPage.screenshot({ path: "screenshots/googlelogin.png" });
});
