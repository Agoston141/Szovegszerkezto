function logSelection(event) {
    const selection = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd,
    );
    console.log(selection);
  }
const textarea = document.querySelector("#editor");
textarea.addEventListener("select", logSelection);


// Betűméret választása
document.getElementById("font-size").addEventListener("change", function () {
  const selectedFontSize = this.value; // Kiválasztott méret
  const editor = document.getElementById("editor"); // Szövegterület
  editor.style.fontSize = selectedFontSize; // Alkalmazza a kiválasztott méretet
});
