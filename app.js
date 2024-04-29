import { countryList } from './country.js';
const baseurl="https://v6.exchangerate-api.com/v6/8b388eb2c945ba99d79c2afc/latest/"
const dropdowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const result=document.querySelector(".op")
const fromcur=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const output=document.querySelector(".op")
for (let select of dropdowns) {
    for (let code of Object.keys(countryList)) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.appendChild(newOption);
        if(select.id==="_from" && code==="USD" )
        {
          newOption.selected="selected";
        }
        if(select.id==="_to" && code==="INR" )
        {
          newOption.selected="selected";
        }
    }

    select.addEventListener("click",(evt)=>{
        updateflag(evt.target)

    })
}

const updateflag=(element)=>
{
    let code=element.value;
    let countrycode=countryList[code];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
   
}
btn.addEventListener("click",async (evt)=>
{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let value=amount.value;
    if(value=== ""||value<1)
    {
          result.innerText="INVALID AMOUNT";
    }
    let from=fromcur.value;
    let to=tocurr.value;
    let url=`${baseurl}${from}`
    let response=await fetch(url);
    let resobj=await response.json();
    let data=resobj.conversion_rates;
    let toval=data[to];
    output.innerText=`${value} ${from}=${data[to]*value} ${to}`
  })