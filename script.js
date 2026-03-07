let products = [];

function LoadProducts(){
const saved = localStorage.getItem("SellingProducts");
if(saved){
products = JSON.parse(saved);
}
}

function SaveProducts(){
localStorage.setItem("SellingProducts", JSON.stringify(products));
}

const ProductsContainer = document.querySelector("#products");
const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector("#close-btn");

menuBtn.onclick = function(){
sidebar.classList.add("active");
}

closeBtn.onclick = function(){
sidebar.classList.remove("active");
}

function renderProducts(){
ProductsContainer.innerHTML = "";

products.forEach((p, index) => {

const productDiv = document.createElement("div");
productDiv.classList.add("product");

const buybtn = document.createElement("button");
buybtn.classList.add("buybtn");
buybtn.textContent = ("Buy")


const RP = document.createElement("button");
RP.textContent = "×";
RP.classList.add("RP");


RP.onclick = function(){
products.splice(index, 1);
SaveProducts();
renderProducts();
}


const status = p.sold;


const soldpng = document.createElement("img");
soldpng.classList.add("soldpngn")
soldpng.src = "sold.png";

const img = document.createElement("img");
img.src = p.image;


const name = document.createElement("p");
name.textContent = p.name;
name.classList.add("product-name");

const price = document.createElement("p");
price.classList.add("price-tag");
price.textContent = p.price + " €";



productDiv.appendChild(soldpng);
productDiv.appendChild(buybtn);
productDiv.appendChild(RP);
productDiv.appendChild(img);
productDiv.appendChild(name);
productDiv.appendChild(price);

ProductsContainer.appendChild(productDiv);

buybtn.onclick = function() {
    if (p.sold === false) {
        p.sold = true;
        SaveProducts();   
        renderProducts();
    } else {
        alert("Juba müüdud!");
    }
}

if (p.sold === true) {
    soldpng.classList.remove("soldpngn");
    soldpng.classList.add("soldpngs");
    buybtn.classList.add("sold");
} else {
    soldpng.classList.add("soldpngn");
}

});
}

LoadProducts();
renderProducts();

document.addEventListener("DOMContentLoaded", function(){


const addProductBtn = document.querySelector("#addproduct");
const productMenu = document.querySelector("#product-menu");
const createProductBtn = document.querySelector("#create-product");

const APCloseBtn = document.querySelector("#AP-close-btn")
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const imageInput = document.querySelector("#product-image");

addProductBtn.onclick = function(){
productMenu.classList.add("active");
sidebar.classList.remove("active");
}

createProductBtn.onclick = function(){
if (priceInput.value === "" || isNaN(priceInput.value)) {
	alert("Sisestatud hind ei ole aksepteeritav");
	return;
}

const newProduct = {
name: nameInput.value,
price: Number(priceInput.value),
image: imageInput.value,
sold: false
}

products.push(newProduct);

SaveProducts();
renderProducts();

productMenu.classList.remove("active");

nameInput.value = "";
priceInput.value = "";
imageInput.value = "";
}

APCloseBtn.onclick = function(){
	productMenu.classList.remove("active");

nameInput.value = "";
priceInput.value = "";
imageInput.value = "";
}
});

const body = document.querySelector("body");
body.classList.add("light");
const darkmode = document.querySelector("#darkmode");
darkmode.onclick = function(){
	if (body.classList.contains("light")) {
		body.classList.remove("light");
		body.classList.add("dark");
		console.log("dark")
	} else {
		body.classList.remove("dark");
		body.classList.add("light");
		console.log("light");
	}
}