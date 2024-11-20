function logSelection(event) {
    const selection = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd,
    );
    console.log(selection);
  }
const textarea = document.querySelector("#editor");
textarea.addEventListener("select", logSelection);


// Betűméret módosítása a kijelölt szövegre
document.getElementById("font-size").addEventListener("change", function () {
  const selectedFontSize = this.value; // Kiválasztott betűméret
  const selection = window.getSelection(); // Aktuális szövegkijelölés

  if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0); // Az első kijelölt tartomány
      const span = document.createElement("span"); // Új span elem
      span.style.fontSize = selectedFontSize; // Betűméret alkalmazása

      const content = range.extractContents(); // Kijelölt szöveg eltávolítása a DOM-ból
      span.appendChild(content); // A tartalom hozzáadása a span elemhez
      range.insertNode(span); // A span elem visszahelyezése a tartomány helyére

      // Visszaállítjuk a kijelölést
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
  }
});

document.getElementById("editor").addEventListener("input", function () {
  const editor = document.getElementById("editor");
  if (editor.innerHTML.trim() === "") {
      // Ha az editor üres, helyezzünk be egy alapértelmezett <p>-t
      editor.innerHTML = "<p><br></p>";
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(editor.childNodes[0], 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
  }
});

//FÉLKÖVÉR BETŰTÍPUZÁS KI ÉS BE KAPCSOLÁS
// Félkövér formázás
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
