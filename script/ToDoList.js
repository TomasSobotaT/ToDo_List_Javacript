class ToDoList {


    constructor() {
        this.textPoznamky = document.getElementById("textPoznamky").value;
        this.barvaPoznamky = document.getElementById("barvaPoznamky").value;

        this.nastenka = document.getElementById("nastenka");
        this.pridejButton = document.getElementById("pridejPoznamku");
        this.smazButton = document.getElementById("smazVse");

        this._pridejPoznamku();
        this._smazVse();

        const zaznamyZeStorage = localStorage.getItem("zaznamyProToDo");
        this.seznamUkolu = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];

        if (this.seznamUkolu.length > 0) {

            this._vykresliNastenku(this.seznamUkolu);
        }
        else {

            this._vykresliPrazdnySeznam();
        }

        document.getElementById("barvaPoznamky").addEventListener("input", () => {
            document.getElementById("textPoznamky").style.backgroundColor = document.getElementById("barvaPoznamky").value;
        });
    }

    // přidá poznámku na nástěnku
    _pridejPoznamku() {


        this.pridejButton.onclick = () => {

          

            this.textPoznamky = document.getElementById("textPoznamky").value;
            this.barvaPoznamky = document.getElementById("barvaPoznamky").value;
            let id = this.seznamUkolu.length + 1;
            let task = new Task(id, this.textPoznamky, this.barvaPoznamky)
            this.seznamUkolu.push(task);
            this._vykresliNastenku(this.seznamUkolu);
            localStorage.setItem("zaznamyProToDo", JSON.stringify(this.seznamUkolu));

            document.getElementById("textPoznamky").placeholder = "...napište nový úkol...";
            document.getElementById("textPoznamky").value = "";
        }
    }

    //smaže po potvrzení všechny poznámky
    _smazVse() {
        this.smazButton.onclick = () => {

            if (confirm("Chcete oprvdu smazat všechny záznamy?")) {

                {
                    this.seznamUkolu = [];
                    localStorage.setItem("zaznamyProToDo", JSON.stringify(this.seznamUkolu));
                    this._vykresliPrazdnySeznam();
                    document.getElementById("textPoznamky").placeholder = "...napište nový úkol...";

                }
            }
        }
    }

    //smaže poznamku
    _smazPoznamku(id) {

        this.seznamUkolu = this.seznamUkolu.filter(task => task.id != id)

        if (this.seznamUkolu.length > 0) {  
            this._vykresliNastenku(this.seznamUkolu);

        }
        else {
            this._vykresliPrazdnySeznam();
        }

        localStorage.setItem("zaznamyProToDo", JSON.stringify(this.seznamUkolu));

    }

    //vykreslní se když je seznam ukolu prazdny
    _vykresliPrazdnySeznam() {
        this.nastenka.innerHTML = "";

        let prvek = document.createElement("div");
        prvek.style.textAlign = "center";
        prvek.style.className = "mt-5";
        prvek.innerText = "Zatím žádné přidané úkoly :(";
        prvek.className = "display-1";
        this.nastenka.append(prvek);
    }


    //vykreslení celé nástěnky
    _vykresliNastenku(seznamUkolu) {

        this.nastenka.innerHTML = "";
        for (let task of seznamUkolu) {


            let prvek = document.createElement("div");
            prvek.className = "prvek";
            prvek.style.position = "relative";
            prvek.style.padding = "10px";
            prvek.style.display = "flex";
            prvek.style.alignItems = "center"
            prvek.style.justifyContent = "center"
            prvek.contentEditable = true;
            prvek.style.border = "1px solid black";
            prvek.style.width = "200px";
            prvek.style.height = "200px"
            prvek.style.backgroundColor = task.barva.toString();
            prvek.textContent = task.text.toString();
            this.nastenka.appendChild(prvek);

            let smazPrvek = document.createElement("div");
            smazPrvek.className = "smazPrvek"
            smazPrvek.style.display = "flex";
            smazPrvek.style.alignItems = "center";
            smazPrvek.style.justifyContent = "center";
            // smazPrvek.style.border = "1px solid black";
            smazPrvek.contentEditable = false;
            smazPrvek.style.position = "absolute";
            smazPrvek.style.top = "0";
            smazPrvek.style.right = "0";
            smazPrvek.textContent = "";
            smazPrvek.style.width = "20px";
            smazPrvek.style.height = "20px"
            // smazPrvek.textContent = "X";
            smazPrvek.style.cursor = "pointer";
            prvek.appendChild(smazPrvek);

            smazPrvek.addEventListener("click", () => {
                this._smazPoznamku(task.id);
            });

            prvek.addEventListener("blur", () => {
                task.text = prvek.innerText;
                localStorage.setItem("zaznamyProToDo", JSON.stringify(this.seznamUkolu));
            });

        }
    }
}



