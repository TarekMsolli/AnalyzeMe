var NOM = document.querySelector("#name");
var DATE = document.querySelector("#date");
var F = document.querySelector("#finput");
var T = document.querySelector("#output")
var CLR = document.querySelector("#snap");
var COUNT = 0;
var AGE;

async function fAnalyzeMe(event){
    COUNT += 1;
    event.preventDefault();

    let d = new Date(DATE.value);

    let urlnat = `https://api.nationalize.io/?name=${NOM.value}`;
    await fetch(urlnat).then(data => {return data.json()}).then( (result) => {addVictim(result);});

    let urldat = `http://numbersapi.com/${d.getMonth()+1}/${d.getDate()}/date`;
    await fetch(urldat).then(data => {return data.text();}).then( (result) => {addHistory(result)});

    let urlage = `https://api.agify.io/?name=${NOM.value}`;
    await fetch(urlage).then(data => {return data.json();}).then( (result) => {addAge(result)});

    if(AGE == null){AGE=1}
    let urlfsl = `http://numbersapi.com/${AGE}?json`;
    X= await fetch(urlfsl).then(data => {return data.json()}).then( (result) => {addFsl(result);});
      
}
async function addVictim(result){
    let d = new Date(DATE.value);
    T.innerHTML +=
        `
            <tr>
                <td rowspan="${result.country.length}">
                    ${NOM.value}
                </td>
                <td>
                    ${result.country[0].country_id}
                    <br>
                    ${result.country[0].probability}
                </td>
                <td rowspan="${result.country.length}">
                    ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}
                </td>
                <td class ="ccj" id= "ccj${COUNT}" rowspan="${result.country.length}">
                </td>
                <td class="age" id ="age${COUNT}" rowspan="${result.country.length}">
                </td>
                <td class="fsl" id="fsl${COUNT}" rowspan="${result.country.length}">
                </td>
            </tr>
        `;
        for(let i = 1; i < result.country.length; i++) {
            T.innerHTML += `
            <tr>
                <td>
                    ${result.country[i].country_id}
                    <br>
                    Probability: ${result.country[i].probability}
                </td>
            </tr>
            `;
        }

}

async function addHistory(result){
    let h = document.querySelector(`#ccj${COUNT}`);
    h.innerText = result;
}

async function addAge(result){
    let a = document.querySelector(`#age${COUNT}`);
    a.innerHTML = result.age;
    AGE = result.age;
}

async function addFsl(result){
    let f = document.querySelector(`#fsl${COUNT}`);
    f.innerHTML = result.text;
}


function clearTable(){
    T.innerHTML = ``
}

F.addEventListener("submit", fAnalyzeMe);
CLR.addEventListener("click", clearTable);