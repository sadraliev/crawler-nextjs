const { sortChildren } = require("./helper");

async function handleDetailsPage(browser, url) {
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const details = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("tbody > tr"));
    let finalArray = [];

    function addEntry(array, item, level) {
      if (level === 1) {
        array.push(item);
        return item;
      } else {
        if (!array[array.length - 1].children) {
          array[array.length - 1].children = [];
        }
        return addEntry(array[array.length - 1].children, item, level - 1);
      }
    }

    function removeCharacter(text, character) {
      const regex = new RegExp(`\\${character}\\s?`, "g");
      return text.replace(regex, "").trim();
    }

    elements.forEach(el => {
      const link = el.querySelector("a");
      const withStar = el.querySelector(".okved") ? true : false;
      const code = link.textContent;

      const fullText = el.querySelector("p").textContent.trim();

      const levels = code.split(".").length;
      addEntry(
        finalArray,
        {
          link: link.href,
          code,
          withStar,
          fullText: removeCharacter(fullText, "★"),
          children: [],
        },
        levels
      );
    });

    return finalArray;
  });

  sortChildren(details);

  await page.close();

  return details;
}

module.exports = {
  handleDetailsPage,
};
