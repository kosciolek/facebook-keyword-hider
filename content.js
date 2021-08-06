console.log("Facebook Keyword Remover - Initializing.");

chrome.storage.sync.get(
  {
    keywords: [],
  },
  function ({ keywords }) {
    console.log(
      `Facebook Keyword Remover - Keywords loaded: [${keywords.join(", ")}]`
    );

    if (!keywords.length) return;

    const feed = document.querySelector("[role=feed]");

    const removeKeywords = () =>
      [...document.querySelectorAll("[role=feed] > div")].forEach((root) => {
        /* Looks a bit unstable, but so far it seems to work. */
        const content = root.querySelectorAll("[dir=auto]")[3];

        if (
          content?.innerText &&
          new RegExp(`(${keywords.join("|")})`).test(content.innerText.toLowerCase())
        ) {
          console.log('content', content.innerText);
          console.log('removed')
          root.parentElement.removeChild(root);
        }
      });

    const mo = new MutationObserver((list) => {
      console.log(list);
      removeKeywords();
    });

    removeKeywords();

    mo.observe(feed, { childList: true, subtree: true });
  }
);
