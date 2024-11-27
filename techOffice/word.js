document.addEventListener("DOMContentLoaded", function () {
    // Ellenőrizzük, hogy létezik-e editor-container
    const editorContainer = document.getElementById("editor-container");

    if (editorContainer) {
        // Funkció, amely új szövegdobozokat hoz létre
        function addNewEditorBox() {
            const newEditorBox = document.createElement("div");
            newEditorBox.classList.add("editor-box");

            const newParagraph = document.createElement("p");
            newParagraph.contentEditable = "true";
            newParagraph.innerText = "Új oldal tartalom...";

            // Kattintás esetén törli az alapértelmezett szöveget
            newParagraph.addEventListener("click", function () {
                if (newParagraph.innerText === "Új oldal tartalom...") {
                    newParagraph.innerText = "";
                }
            });

            newEditorBox.appendChild(newParagraph);
            editorContainer.appendChild(newEditorBox);
        }

        // Az oldal betöltésekor egy editor automatikusan létrejön
        addNewEditorBox();

        // Az "align-right" gombra kattintáskor új szövegdoboz hozzáadása
        document.getElementById("align-right").addEventListener("click", function () {
            addNewEditorBox(); // Új szövegdoboz létrehozása
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


/***********************************EXPORT/SAVE GOMB *********************************************/
/****************************************Ask the user what should be the name of the document. - kérdezze meg, milyen nevet szeretne a fájlnévnek.*******************************************************/


/********************Download engine - letöltő motor (txt) */
document.getElementById("align-left").addEventListener("click", function () {
    const paragraphs = document.querySelectorAll("#editor-container p");
    let textContent = "";
    paragraphs.forEach(p => {
        textContent += p.innerText + "\n"; 
    });

    // Megkérdezzük a fájl nevét
    const fileName = prompt("Add meg a fájl nevét:", "A dokumentumod neve...");
    if (fileName) {
        const blob = new Blob([textContent], { type: "application/rtf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + "."; // Hozzáadjuk a fájl nevet a kiterjesztéssel
        link.click();
        URL.revokeObjectURL(link.href);
    } else {
        alert("A fájl mentése megszakítva."); // Ha a felhasználó nem adott nevet
    }
});
//EHHEZ MAJD KELL EGY WORD/DOCX megoldás, egyelőre ez nincsen meg.


/***************************FONT FAMILY *************************************************/

document.getElementById("font-family").addEventListener("change", function () {
    const selectedFont = this.value; // Kiválasztott betűtípus
    const selection = window.getSelection(); // Kijelölt szöveg

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0); // A kijelölt tartomány
        const span = document.createElement("span"); // Új <span> létrehozása
        span.style.fontFamily = selectedFont; // Betűtípus alkalmazása
        span.appendChild(range.extractContents()); // Tartalom másolása
        range.insertNode(span); // Visszahelyezés a DOM-ba

        // Visszaállítjuk a kijelölést
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
});
