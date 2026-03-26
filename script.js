const BIN_ID = "69c4e7e2b7ec241ddca4ff58";

let products = [];

async function LoadProducts() {

    ProductsContainer.innerHTML = "Loading products...";

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`);
        const data = await response.json();
        products = data.record.products || [];
    } catch (err) {
        console.error("Failed to load products:", err);
        products = [];
    }

    renderProducts();
}

async function SaveProducts() {
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ products })
        });
    } catch (err) {
        console.error("Failed to save products:", err);
    }
}

const ProductsContainer = document.querySelector("#products");
const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector("#close-btn");

menuBtn.onclick = function() {
    sidebar.classList.add("active");
    ProductsContainer.classList.add("sidebar-active");
}

closeBtn.onclick = function() {
    sidebar.classList.remove("active");
    ProductsContainer.classList.remove("sidebar-active");
}

function renderProducts() {
    ProductsContainer.innerHTML = "";

    products.forEach((p, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const buybtn = document.createElement("button");
        buybtn.classList.add("buybtn");
        buybtn.textContent = "Buy";

        const RP = document.createElement("button");
        RP.textContent = "×";
        RP.classList.add("RP");

        RP.onclick = function() {
            products.splice(index, 1);
            SaveProducts();
            renderProducts();
        }

        const buymenu = document.querySelector("#buy-menu");
        const BMCbtn = document.querySelector("#BP-close-btn");
        const confirmbuy = document.querySelector("#confirmbuy");
        const productbought = document.querySelector("#product-bought");
        const continuebtn = document.querySelector("#continue");

        const soldpng = document.createElement("img");
        soldpng.classList.add("soldpngn");
        soldpng.src = "sold.png";

        const img = document.createElement("img");
        img.src = p.image;
        img.classList.add("img");

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

        BMCbtn.onclick = function() {
            buymenu.classList.remove("active");
            const existingClone = buymenu.querySelector(".clone");
            if (existingClone) existingClone.remove();
        }

        buybtn.onclick = function() {
            const clone = productDiv.cloneNode(true);
            const exists = buymenu.querySelector(".clone");
            if (exists) exists.remove();

            buymenu.classList.add("active");
            clone.querySelector(".buybtn").remove();
            clone.querySelector(".RP").remove();

            buymenu.appendChild(clone);
            clone.classList.add("clone");

            confirmbuy.onclick = async function() {
                productbought.classList.add("active");
                p.sold = true;
                await SaveProducts();
                renderProducts();
            }

            continuebtn.onclick = function() {
                productbought.classList.remove("active");
                clone.remove();
                buymenu.classList.remove("active");
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

document.addEventListener("DOMContentLoaded", function() {
    const addProductBtn = document.querySelector("#addproduct");
    const productMenu = document.querySelector("#product-menu");
    const createProductBtn = document.querySelector("#create-product");
    const APCloseBtn = document.querySelector("#AP-close-btn");
    const nameInput = document.querySelector("#product-name");
    const priceInput = document.querySelector("#product-price");
    const imageInput = document.querySelector("#product-image");

    addProductBtn.onclick = function() {
        productMenu.classList.add("active");
        sidebar.classList.remove("active");
    }

createProductBtn.onclick = async function() {

    createProductBtn.disabled = true;

    if (priceInput.value === "" || isNaN(priceInput.value)) {
        alert("Sisestatud hind ei ole aksepteeritav");
        createProductBtn.disabled = false;
        return;
    }

    const newProduct = {
        name: nameInput.value,
        price: Number(priceInput.value),
        image: imageInput.value,
        sold: false
    }

    products.push(newProduct);
    await SaveProducts();
    renderProducts();

    productMenu.classList.remove("active");

    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";

    createProductBtn.disabled = false;
}

    APCloseBtn.onclick = function() {
        productMenu.classList.remove("active");
        nameInput.value = "";
        priceInput.value = "";
        imageInput.value = "";
    }
});

const body = document.querySelector("body");

body.classList.add("darkmodestart");
body.classList.add("darkstart");

const darkmode = document.querySelector("#darkmode");

darkmode.onclick = function(){

	if (body.classList.contains("darkmodestart")) {
		body.classList.remove("darkmodestart");
		body.classList.add("light");
		body.classList.remove("dark");
		console.log("light")
	} else if (body.classList.contains("light")){
		body.classList.add("dark");
		body.classList.remove("light");
		console.log("dark");
    }
	else if (body.classList.contains("dark")) {
		body.classList.remove("darkstart");
		body.classList.add("light");
		body.classList.remove("dark");
		console.log("light");

    }
}