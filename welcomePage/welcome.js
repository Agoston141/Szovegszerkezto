document.addEventListener("DOMContentLoaded", () => {

    //ez a form azert kell hogy tároljuk hogy melyik opciot választotta
    const form = document.getElementById("knowledgeForm");
    const nextButton = document.getElementById("nextButton");

    nextButton.addEventListener("click", (event) => {
        event.preventDefault(); 
        const selectedOption = form.querySelector('input[name="knowledge"]:checked');
        if (!selectedOption) {
            alert("Kérlek, válassz egy opciót, mielőtt tovább lépnél!");
        } else {
            const selectedValue = selectedOption.value;//itt tárolom
            console.log("A választott opció:", selectedValue);//itt pedig kiiratom console log-ba
            window.location.href = "../techOffice/index.html";
        }
    });
});

