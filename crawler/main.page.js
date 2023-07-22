async function handleMainPage(browser, url) {
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const links = await page.evaluate(() => {
    const selector = "tbody > tr";
    const searchString = "Раздел";

    return Array.from(document.querySelectorAll(selector))
      .filter(el => {
        return el.textContent.includes(searchString);
      })
      .map(el => {
        const url = el.querySelector("a");
        const sectionType = el.querySelector("td > b");
        return {
          url: url ? url.href : null,
          sectionType: sectionType ? sectionType.innerText : null,
          sectionName: url ? url.innerText : null,
        };
      })
      .filter(section => section.url !== null);
  });

  await page.close();

  return links;
}

module.exports = {
  handleMainPage,
};
