import { expect, test } from "@playwright/test";

test("loads the complete board", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Launchpad" })).toBeVisible();
  await expect(page.getByRole("region", { name: /column$/i })).toHaveCount(5);
  await expect(page.getByText("Explore referral loop")).toBeVisible();
});

test("renames a column and manages a card", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("textbox", { name: "Rename Backlog column" });
  await title.fill("New ideas");
  await title.press("Enter");
  await expect(page.getByRole("textbox", { name: "Rename New ideas column" })).toHaveValue("New ideas");

  const column = page.getByRole("region", { name: "New ideas column" });
  await column.getByRole("button", { name: "Add card" }).click();
  await column.getByRole("textbox", { name: "Card title" }).fill("Plan customer interviews");
  await column.getByRole("textbox", { name: "Card details" }).fill("Recruit five active teams.");
  await column.getByRole("button", { name: "Add card" }).click();
  await expect(column.getByText("Plan customer interviews")).toBeVisible();
  await column.getByRole("button", { name: "Delete Plan customer interviews" }).click();
  await expect(column.getByText("Plan customer interviews")).toHaveCount(0);
});

test("moves a card to another column", async ({ page }) => {
  await page.goto("/");
  const handle = page.getByRole("button", { name: "Move Explore referral loop" });
  const target = page.getByTestId("column-ready");
  const sourceBox = await handle.boundingBox();
  const targetBox = await target.boundingBox();
  if (!sourceBox || !targetBox) throw new Error("Drag elements were not laid out");
  await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 12 });
  await page.mouse.up();
  await expect(target.getByText("Explore referral loop")).toBeVisible();
  await expect(page.getByTestId("column-backlog").getByText("Explore referral loop")).toHaveCount(0);
});

test("remains usable on a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Launchpad" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Backlog column" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add card" }).first()).toBeVisible();
});
