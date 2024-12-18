document.addEventListener("DOMContentLoaded", ()=> {
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
            newParagraph.addEventListener("click",  ()=> {
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
        document.getElementById("align-right").addEventListener("click", ()=> {
            addNewEditorBox(); // Új szövegdoboz létrehozása
        });
    } else {
        console.error("Az editor-container elem nem található a fő oldalon.");
    }


});





/****************************************TOOLBAR*********************************************** */


//Teljes szoveg törlese.
document.getElementById("align-center").addEventListener("click", () => {
    const confirmation = confirm("Biztosan törölni szeretnéd az összes szöveget?");
    if (confirmation) {
        const editorContainer = document.getElementById("editor-container");


        const editorElement = document.getElementById("editor");

        const paragraphs = editorContainer.querySelectorAll("p");
        paragraphs.forEach(p => {
            p.innerText = ""; // A szöveg törlése
        });

        let firstChild = editorContainer.firstChild;
        document.getElementById("align-center").addEventListener("click", ()=> {
            const confirmation = confirm("Biztosan törölni szeretnéd az összes szöveget?");
            if (confirmation) {
                const editorContainer = document.getElementById("editor-container");
                const editorElement = document.getElementById("editor");

                // Töröljük az összes gyerekelemet, kivéve az editor-t
                let firstChild = editorContainer.firstChild;
                while (firstChild) {
                    if (firstChild !== editorElement) {
                        editorContainer.removeChild(firstChild);
                    }
                    firstChild = editorContainer.firstChild;
                }
            }
        });
        const newEditorBox1 = document.createElement("div");
        newEditorBox1.classList.add("editor-box");

        const newParagraph1 = document.createElement("p");
        newParagraph1.contentEditable = "true";
        newParagraph1.innerText = "Új oldal tartalom...";

        newParagraph1.addEventListener("click",  ()=> {
            if (newParagraph1.innerText === "Új oldal tartalom...") {
                newParagraph1.innerText = "";
            }
        });

        newEditorBox1.appendChild(newParagraph1);
        editorContainer.appendChild(newEditorBox1);
        const newEditorBox2 = document.createElement("div");
        newEditorBox2.classList.add("editor-box");

        const newParagraph2 = document.createElement("p");
        newParagraph2.contentEditable = "true";
        newParagraph2.innerText = "Új oldal tartalom...";

        newParagraph2.addEventListener("click",  ()=> {
            if (newParagraph2.innerText === "Új oldal tartalom...") {
                newParagraph2.innerText = "";
            }
        });

        newEditorBox2.appendChild(newParagraph2);
        editorContainer.appendChild(newEditorBox2);
    }
});






/***********************************EXPORT/SAVE GOMB *********************************************/
/* kérdezze meg, milyen nevet szeretne a fájlnévnek.*******************************************************/


/********************Download engine - letöltő motor (txt) */
document.getElementById("align-left").addEventListener("click",  ()=> {
    const paragraphs = document.querySelectorAll("#editor-container p");
    let textContent = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1038{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}";  // Kezdő RTF szintaxis

    paragraphs.forEach(p => {
        let paragraphText = p.innerText;

        let rtfFormattedText = convertToUnicodeRTF(paragraphText);

        const style = window.getComputedStyle(p);

        let fontFamily = style.fontFamily || 'Arial';
        let fontSize = parseInt(style.fontSize) || 12;

        textContent += `\\f0\\fs${fontSize * 2} ${rtfFormattedText}\\par`;


    });

    textContent += "}";
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

// Függvény amely a szöveget Unicode karakterekké alakítja RTF formátumban
function convertToUnicodeRTF(text) {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        if (charCode > 127) {
            return `\\u${charCode} ?`;
        } else {
            return char;
        }
    }).join('');
}


//EHHEZ MAJD KELL EGY WORD/DOCX megoldás, egyelőre ez nincsen meg.


// Betűméret változtatása
document.getElementById("font-size").addEventListener("change", (event) => {
    const selectedFontSize = event.target.value;
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
document.getElementById("font-family").addEventListener("change", (event) => {
    const selectedFont = event.target.value;
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

//Téma gomb
const themebutton = document.querySelector("#ThemeButton")
themebutton.addEventListener("click", () => {
    const body = document.querySelector("body");
    const toolbar = document.querySelector(".toolbar");
    const saveButton= document.querySelector(".save")
    const DeleteButton= document.querySelector(".delete")
    const NewButton= document.querySelector(".New")
    const boldButton = document.querySelector("#BoldButton")
    const italicButton = document.querySelector("#ItalicButton")

    body.classList.toggle("light-mode")
    body.classList.toggle("dark-mode")
    toolbar.classList.toggle("dark-mode")  

    saveButton.classList.toggle("invert")
    DeleteButton.classList.toggle("invert")
    NewButton.classList.toggle("invert")
    themebutton.classList.toggle("invert")
    boldButton.classList.toggle("invert")
    italicButton.classList.toggle("invert")
});



//félövér Gomb

const boldButton = document.querySelector("#BoldButton").addEventListener("click", () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.parentNode;

        if (parentElement.classList.contains("boldMode")) {
            parentElement.classList.remove("boldMode"); 
        } else {

            const span = document.createElement("span");
            span.classList.add("boldMode");
            const content = range.extractContents();
            span.appendChild(content);
            range.insertNode(span);
        }
    }
});

//Dőlt Gomb
const italicButton = document.querySelector("#ItalicButton")
italicButton.addEventListener("click", () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.parentNode;

        if (parentElement.classList.contains("italicMode")) {
            parentElement.classList.remove("italicMode");
        } else {
            const span = document.createElement("span");
            span.classList.add("italicMode");
            const content = range.extractContents();
            span.appendChild(content);
            range.insertNode(span);
        }
    }
})
