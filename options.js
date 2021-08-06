document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save");
  const input = document.getElementById("keywords");

  chrome.storage.sync.get(
    {
      keywords: [],
    },
    function ({ keywords }) {
      input.value = keywords.join(", ");
      saveBtn.addEventListener("click", () => {
        const newKeywords = input.value
          .replace(/\r?\n/g, "")
          .split(",")
          .map((kw) => kw.trim().toLowerCase());

        const removedDuplicates = [...new Set(newKeywords)];

        chrome.storage.sync.set(
          {
            keywords: removedDuplicates,
          },
          function () {
            input.value = removedDuplicates.join(", ");
            saveBtn.textContent = "Saved!";
            setTimeout(function () {
              saveBtn.textContent = "Save";
            }, 750);
          }
        );
      });
    }
  );
});
