const products = {
    1: {
        id: 1,
        name: "Asus Laptop",
        image: "asus-laptop.jpg",
        price: 750
    },
    2: {
        id: 2,
        name: "Acer Laptop",
        image: "acer-laptop.jpg",
        price: 800
    },
    3: {
        id: 3,
        name: "MSI Laptop",
        image: "msi-laptop.png",
        price: 630
    },
    4: {
        id: 4,
        name: "Apple Macbook",
        image: "apple-macbook.jpg",
        price: 1000
    },

}

let cart = [];

function createProductDisplay(product) {
    const container = document.createElement("div");
    container.classList.add("product-card");
    const image = document.createElement("img");
    image.classList.add("product-image");
    image.setAttribute("src", product.image);
    container.appendChild(image);
    const productName = document.createElement("h4");
    productName.innerText = product.name;
    container.appendChild(productName);
    const productPrice = document.createElement("h3");
    productPrice.innerText = `$${product.price}`;
    container.appendChild(productPrice);
    const cartButton = document.createElement("button");
    cartButton.id = `cart-button-${product.id}`;
    cartButton.innerText = "Add to Cart";
    cartButton.addEventListener("click", (e) => {
        e.preventDefault();
        cartButton.innerText = "In Cart";
        cartButton.disabled = true;
        cartButton.classList.add("disabled");
        const cartItem = {"product": product, "quantity": 1, "lineTotal": product.price}
        cart.push(cartItem);
        createCartLine(cartItem);
    })
    container.appendChild(cartButton);
    const parent = document.getElementById("product-container");
    parent.appendChild(container);
}
for (const id in products) {
    createProductDisplay(products[id]);
}

const screenWidth = window.innerWidth;
let currentIndex = 0;
let productViewSize = 0;
if (screenWidth > 500) {
    productViewSize = 4;
} else if (screenWidth > 400) {
    productViewSize = 3;
} else if (screenWidth > 300) {
    productViewSize = 2;
}
else {
    productViewSize = 1;
}

function displayProducts(index) {
    const displays = document.getElementsByClassName("product-card");

    console.log(displays);
    for (let i = 0; i < displays.length; i++) {
        if (i >= index && i < productViewSize + index ) {
            console.log(i);
            displays[i].classList.remove("hide");
            displays[i].classList.add("show");
        } else {
            console.log(i);
            displays[i].classList.remove("show");
            displays[i].classList.add("hide");
        }
    }
}

if (productViewSize < Object.keys(products).length) {
    console.log("buttons");
    const buttons = document.getElementsByClassName("card-nav");
    for (let index = 0; index < buttons.length; index++) {
        console.log(index);
        buttons[index].classList.add("show");
    }
} else {
    const buttons = document.getElementsByClassName("card-nav");
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].classList.add("hide");
    }
}

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isDisabled = prevButton.classList.contains("disabled");
    if (!isDisabled) {
        currentIndex -= productViewSize;
        displayProducts(currentIndex);
        if (currentIndex <=0) {
            prevButton.classList.add("disabled")
        }
        nextButton.classList.remove("disabled");
    }
    console.log(isDisabled);
});

nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isDisabled = nextButton.classList.contains("disabled");
    if (!isDisabled) {
        currentIndex += productViewSize;
        displayProducts(currentIndex);
        if (currentIndex + productViewSize >= Object.keys(products).length) {
            console.log("next disable");
            nextButton.classList.add("disabled");
        }
        prevButton.classList.remove("disabled");
    }
})

displayProducts(0);

function createCartLine(lineItem) {
    const cartLine = document.createElement("div");
    cartLine.classList.add("cart-line")
    const productName = document.createElement("div");
    productName.classList.add("float-left", "cart-info");
    productName.innerText = lineItem.product.name;
    cartLine.appendChild(productName);
    const plusButton = document.createElement("button");
    plusButton.classList.add("float-right", "cart-button");
    plusButton.innerText = "+";
    const lineTotal = document.createElement("div");
    const quantity = document.createElement("div");
    plusButton.addEventListener("click", (e) => {
        e.preventDefault();
        lineItem.quantity++;
        quantity.innerText = `x${lineItem.quantity}`;
        lineItem.lineTotal = lineItem.product.price * lineItem.quantity;
        lineTotal.innerText = `$${lineItem.lineTotal}`;
        console.log(cart);
        displayTotal();
    });
    cartLine.appendChild(plusButton);
    const minusButton = document.createElement("button");
    minusButton.classList.add("float-right", "cart-button");
    minusButton.innerText = "-";
    minusButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (lineItem.quantity === 1) {
            cartLine.remove();
            let index = cart.indexOf(lineItem);
            cart.splice(index, 1);
            const cartButton = document.getElementById(`cart-button-${lineItem.product.id}`);
            cartButton.disabled = false;
            cartButton.innerText = "Add to Cart";
            cartButton.classList.remove("disabled");
        } else {
            lineItem.quantity--;
            quantity.innerText = `x${lineItem.quantity}`;
            lineItem.lineTotal = lineItem.quantity * lineItem.product.price;
            lineTotal.innerText = `$${lineItem.lineTotal}`;
        }
        displayTotal();
    });
    cartLine.appendChild(minusButton);
    lineTotal.classList.add("float-right", "cart-line-total", "cart-info");
    lineTotal.innerText = `$${lineItem.lineTotal}`;
    cartLine.appendChild(lineTotal);
    quantity.classList.add("float-right", "cart-info");
    quantity.innerText = `x${lineItem.quantity}`;
    cartLine.appendChild(quantity);
    const cartContents = document.getElementById("cart-contents");
    cartContents.appendChild(cartLine);
    displayTotal();
}

function displayTotal() {
    let total = cart.reduce((sum, item) => {
        return sum + item.lineTotal;
    }, 0);
    const cartTotal = document.getElementById("cart-total");
    cartTotal.innerText = `Total: $${total}`;
}