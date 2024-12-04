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
    //Téma gomb
const themebutton = document.querySelector("#ThemeButton")

themebutton.addEventListener("click",()=>{
    const body= document.querySelector("body")
    const toolbar = document.querySelector(".toolbar")
    const editor = document.querySelector(".editor")
    body.style.backgroundColor="#1d1d1d"
    toolbar.style.backgroundColor="#534f4f"
    editor.style.backgroundColor="#746c6c"
})

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

/***********************************EXPORT/SAVE GOMB *********************************************/
/****************************************Ask the user what should be the name of the document. - kérdezze meg, milyen nevet szeretne a fájlnévnek.*******************************************************/


/********************Download engine - letöltő motor (txt) */
document.getElementById("align-left").addEventListener("click", function () {
    const paragraphs = document.querySelectorAll("#editor-container p");
    let textContent = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1038{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}";  // Kezdő RTF szintaxis

    paragraphs.forEach(p => {
        let paragraphText = p.innerText;

        // A szöveg minden karakterét Unicode szekvenciává alakítjuk
        let rtfFormattedText = convertToUnicodeRTF(paragraphText);

        // Ellenőrizzük a formázásokat a szövegben (pl. félkövér, dőlt, betűméret)
        const style = window.getComputedStyle(p);

        // Betűtípus és méret hozzáadása
        let fontFamily = style.fontFamily || 'Arial';
        let fontSize = parseInt(style.fontSize) || 12;

        // Hozzáadjuk a formázott szöveget az RTF szintaxishoz
        textContent += `\\f0\\fs${fontSize * 2} ${rtfFormattedText}\\par`;

        // Félkövér formázás
        if (style.fontWeight === 'bold') {
            textContent = textContent.replace(rtfFormattedText, `\\b ${rtfFormattedText} \\b0`);
        }

        // Dőlt formázás
        if (style.fontStyle === 'italic') {
            textContent = textContent.replace(rtfFormattedText, `\\i ${rtfFormattedText} \\i0`);
        }
    });

    textContent += "}";  // Befejező RTF szintaxis

    // Megkérdezzük a fájl nevét
    const fileName = prompt("\tA fájlod plain textként fog letölteni, amely az itt alkalmazott formázásokat nem alkalmazza\t \tAdd meg a fájl nevét:", "A dokumentumod neve...");
    if (fileName) {
        const blob = new Blob([textContent], { type: "application/rtf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + ".rtf";  // RTF kiterjesztés
        link.click();
        URL.revokeObjectURL(link.href);
    } else {
        alert("A fájl mentése megszakítva.");
    }
});

// Függvény, amely a szöveget Unicode karakterekké alakítja RTF formátumban
function convertToUnicodeRTF(text) {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        if (charCode > 127) {
            return `\\u${charCode} ?`; // Unicode karakterek RTF formátumban
        } else {
            return char;  // ASCII karakterek
        }
    }).join('');
}


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

// Félkövér formázás alkalmazása


// Betűméret változtatása
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

// Betűtípus változtatása
document.getElementById("font-family").addEventListener("change", function () {
    const selectedFont = this.value;
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.fontFamily = selectedFont;

        const content = range.extractContents();
        span.appendChild(content);
        range.insertNode(span);

        const newRange = document.createRange();
        newRange.selectNodeContents(span);  
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
});

