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