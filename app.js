const base_url ="https://v6.exchangerate-api.com/v6/d8664d5bc75c809de71c6798/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr =document.querySelector('.from-dropdown select');
const toCurr=document.querySelector('.to-dropdown select') ;
const msg =document.querySelector(".msg");

for (let select of dropdowns){
    for(let currCode in countryList ){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" &&  currCode == "USD"){
            newOption.selected="selected";
        }else if(select.name=== "to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};
   

const updateExchangerate = async () => {
    let amount =document.querySelector('.amount input');
    let amtvalue= amount.value;
    if (amtvalue === '' || amtvalue < 1){
        amtvalue =1;
        amtvalue.vlaue=1;
    }

    //console.log(amtvalue);
   // console.log(fromCurr.value, toCurr.value);

    const url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    let response = await fetch(url);
    let  data =await response.json();
    //console.log(data);
    let rate = data.conversion_rate;
    //console.log(rate);
    let finalAmt =  amtvalue * rate;
    //console.log(finalAmt);
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}` ;

}



btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangerate();
}); 

window.addEventListener("load", () => {
    updateExchangerate();
} );