

document.addEventListener("DOMContentLoaded", function () {
  // Ellenőrizzük, hogy létezik-e editor-container
  const editorContainer = document.getElementById("editor-container");

  if (editorContainer) {
      // Az első szövegdobozra kattintás figyelése
      const firstEditor = editorContainer.querySelector(".editor-box p");

      if (firstEditor) {
          firstEditor.addEventListener("click", function() {
              if (firstEditor.innerText === "Új oldal tartalom...") {
                  firstEditor.innerText = ""; // Ha az alap szöveg van, töröljük
              }
          });
      }

      // Funkció, amely új szövegdobozokat hoz létre
      function addNewEditorBox() {
          // Létrehozunk egy új szövegdobozt
          const newEditorBox = document.createElement("div");
          newEditorBox.classList.add("editor-box");

          // Létrehozzuk a szövegdobozhoz tartozó <p> elemet
          const newParagraph = document.createElement("p");
          newParagraph.contentEditable = "true"; // Beállítjuk, hogy szerkeszthető legyen
          newParagraph.innerText = "Új oldal tartalom..."; // Kezdő szöveg

          // Az új szövegdobozhoz kattintás eseményt adunk hozzá
          newParagraph.addEventListener("click", function() {
              if (newParagraph.innerText === "Új oldal tartalom...") {
                  newParagraph.innerText = ""; // Ha a kezdő szöveg van benne, töröljük
              }
          });

          newEditorBox.appendChild(newParagraph);

          // A szövegdoboz hozzáadása a konténerhez
          editorContainer.appendChild(newEditorBox);
      }

      // Funkció az összes szöveg törlésére
      function clearAllText() {
          const allParagraphs = document.querySelectorAll('p');
          allParagraphs.forEach(p => {
              p.innerText = ""; // Az összes szövegdoboz tartalmát töröljük
          });
      }

      // Az align-left gombra kattintáskor új szövegdoboz hozzáadása
      document.getElementById("align-left").addEventListener("click", function() {
          addNewEditorBox();  // Új szövegdoboz hozzáadása
      });

      // Az align-right gombra kattintáskor új szövegdoboz hozzáadása
      document.getElementById("align-right").addEventListener("click", function() {
          addNewEditorBox(); // Új szövegdoboz hozzáadása
      });

      // Az align-center gombra kattintáskor az összes szöveg törlése
      document.getElementById("align-center").addEventListener("click", function() {
          const confirmation = confirm("Biztosan törölni szeretnéd az összes szöveget? Ez nem visszavonható.");
          if (confirmation) {
              clearAllText();  // Az összes szöveg törlése az összes szövegdobozból
          }
      });
  } else {
      console.error("Az editor-container elem nem található a fő oldalon.");
  }
});



/****************************************TOOLBAR*********************************************** */





// FONT beállítások
document.getElementById("font-size").addEventListener("change", function () {
    const selectedFontSize = this.value;
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.fontSize = selectedFontSize;

        const content = range.extractContents();
        span.appendChild(content);
        range.insertNode(span);

        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
});

// BOLD - Félkövér
document.getElementById("bold").addEventListener("click", function () {
  const selection = window.getSelection(); // Aktuális szövegkijelölés

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0); // Az első kijelölt tartomány
    const parentNode = range.commonAncestorContainer.parentNode;

    // Ellenőrizzük, hogy a kijelölt szöveg már félkövér-e
    if (parentNode.tagName === "STRONG") {
      // Ha igen, eltávolítjuk a félkövér formázást
      const content = range.extractContents();
      parentNode.parentNode.replaceChild(content, parentNode);
    } else {
      // Ha nem, alkalmazzuk a félkövér formázást
      const strong = document.createElement("strong"); // Félkövér elem
      const content = range.extractContents(); // Kijelölt szöveg eltávolítása a DOM-ból
      strong.appendChild(content); // A tartalom hozzáadása a strong elemhez
      range.insertNode(strong); // A strong elem visszahelyezése a tartomány helyére

      // Visszaállítjuk a kijelölést
      const newRange = document.createRange();
      newRange.selectNodeContents(strong);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }
});
