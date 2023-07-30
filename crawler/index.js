require("dotenv").config({ path: ".env.local" });
const puppeteer = require("puppeteer-core");

const { handleDetailsPage } = require("./details.page");
const { handleMainPage } = require("./main.page");
const { saveResultsToJSON } = require("./helper");

const BASE_URL = process.env.SCRAPE_URL;
const PATH_FILE = process.env.NEXT_PUBLIC_FILE_PATH;

async function crawlWebsite(url) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const results = [];

  const sections = await handleMainPage(browser, url);
  for (const section of sections) {
    const details = await handleDetailsPage(browser, section.url);
    results.push({
      sectionType: section.sectionType,
      sectionName: section.sectionName,
      sectionURL: section.url,
      details,
    });
  }

  await browser.close();

  return results;
}

crawlWebsite(BASE_URL)
  .then(data => {
    console.log(data);
    return saveResultsToJSON(data, `./public/${PATH_FILE}`);
  })
  .then(() => {
    console.log("Данные успешно сохранены в results.json");
  })
  .catch(err => console.error(err));
