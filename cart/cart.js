'use script'
fetch('https://fakestoreapi.com/products')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const products = data;
        products.forEach(product => {
            console.log(product)
            createProduct(product)
        });
    });

const productsContainer = document.querySelector('.products__container');

function createProduct(p) {
    const product = document.createElement('div');
    product.className = 'product';
    productsContainer.append(product);
    const productTitle = document.createElement('h3');
    productTitle.className = 'product__title';
    productTitle.innerHTML = `${p.title}`;
    product.append(productTitle);
    const productImage = document.createElement('img');
    productImage.className = 'product__img';
    productImage.src = `${p.image}`;
    productImage.alt = `image ${p.title}`;
    product.append(productImage);
    const productPrice = document.createElement('span');
    productPrice.className = 'product__price';
    productPrice.innerHTML = `${p.price} $`;
    product.append(productPrice);
    const productFooter = document.createElement('div');
    productFooter.className = 'product__footer';
    product.append(productFooter);
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'product__add-to-cart-btn';
    addToCartBtn.innerHTML = 'add to cart';
    productFooter.append(addToCartBtn);
    const decrementProductCount = document.createElement('button');
    decrementProductCount.className = 'product__decrement';
    decrementProductCount.innerHTML = '-';
    productFooter.append(decrementProductCount);
    const productCount = document.createElement('span');
    productCount.className = 'product__count';
    productFooter.append(productCount);
    const incrementProductCount = document.createElement('button');
    incrementProductCount.className = 'product__increment';
    incrementProductCount.innerHTML = '+';
    productFooter.append(incrementProductCount);
}

const productsInCart = {};

function addToCart(id, amount = 1) {
    productsInCart.set(id, amount);
    localStorage.setItem(id, amount);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}