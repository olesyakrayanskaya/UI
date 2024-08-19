'use script'
fetch('https://fakestoreapi.com/products')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const products = data;
        products.forEach(product => {
            createProduct(product)
        });
    });

const productsContainer = document.querySelector('.products__container');

const productsInCart = {};

const headerCountInCart = document.querySelector('.header__cart-count');
if (headerCountInCart.innerHTML <= 0) {
    headerCountInCart.classList.add('hidden');
}

function createProduct(p) {
    const product = document.createElement('div');
    product.className = 'product';
    productsContainer.append(product);

    const productTitle = document.createElement('h3');
    productTitle.className = 'product__title';
    productTitle.innerHTML = p.title;
    product.append(productTitle);

    const productImage = document.createElement('img');
    productImage.className = 'product__img';
    productImage.src = p.image;
    productImage.alt = `image ${p.title}`;
    product.append(productImage);

    const productPrice = document.createElement('span');
    productPrice.className = 'product__price';
    productPrice.innerHTML = `${p.price} $`;
    product.append(productPrice);

    const productFooter = document.createElement('div');
    productFooter.className = 'product__footer';
    product.append(productFooter);

    const productCount = document.createElement('span');
    productCount.className = 'product__count';


    const productCountBlock = document.createElement('div');
    productCountBlock.className = 'product__count-block';
    productCountBlock.classList.add('hidden');


    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'product__add-to-cart-btn';
    addToCartBtn.innerHTML = 'add to cart';
    addToCartBtn.setAttribute('data-product-id', p.id);
    addToCartBtn.addEventListener('click', () => {
        addToCart(p.id, 1);
        addToCartBtn.innerHTML = 'in cart';
        productCount.innerHTML = productsInCart[p.id];
        productCountBlock.classList.remove('hidden');
        headerCountInCart.innerHTML = Object.keys(productsInCart).length;
        headerCountInCart.classList.remove('hidden');
        console.log(productsInCart)
    })
    productFooter.append(addToCartBtn);

    const decrementProductCount = document.createElement('button');
    decrementProductCount.className = 'product__decrement';
    decrementProductCount.innerHTML = '-';
    decrementProductCount.addEventListener('click', () => {
        if (productsInCart[p.id] > 0) {
            productsInCart[p.id] = Number(productsInCart[p.id]) - 1;
            productCount.innerHTML = productCount.innerHTML - 1;
            headerCountInCart.innerHTML = Object.keys(productsInCart).length;
            headerCountInCart.classList.remove('hidden');
        }
        if (productCount.innerHTML == 0) {
            addToCartBtn.innerHTML = 'add to cart';
            productCountBlock.classList.add('hidden');
            delete productsInCart[p.id];
            headerCountInCart.innerHTML = Object.keys(productsInCart).length;
            if (headerCountInCart.innerHTML == 0) {
                headerCountInCart.classList.add('hidden');
            }
        }
    })

    productFooter.append(productCountBlock);

    productCountBlock.append(decrementProductCount);

    productCountBlock.append(productCount);

    const incrementProductCount = document.createElement('button');
    incrementProductCount.className = 'product__increment';
    incrementProductCount.innerHTML = '+';
    incrementProductCount.addEventListener('click', () => {
        productsInCart[p.id] = Number(productsInCart[p.id]) + 1;
        productCount.innerHTML = Number(productCount.innerHTML) + 1;
    })
    productCountBlock.append(incrementProductCount);
}

function addToCart(id, count) {
    if (!Object.keys(productsInCart).includes(id))
        productsInCart[id] = Number(count);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function openCart() {
    const openCartBtn = document.querySelector('.header__cart');
    const cart = document.querySelector('.cart');
    openCartBtn.addEventListener('click', () => {
        openCartBtn.classList.add('hidden');
        cart.classList.remove('hidden');
        createCart();
    })
}

function closeCart() {
    const closeCartBtn = document.querySelector('.cart__close');
    const cart = document.querySelector('.cart');
    const openCartBtn = document.querySelector('.header__cart');
    closeCartBtn.addEventListener('click', () => {
        cart.classList.add('hidden');
        openCartBtn.classList.remove('hidden');
    });
}

function createCart() {

    Object.keys(productsInCart).forEach((id) => {

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const product = data;
                console.log(product);
                createCartItems(product);
            });

    })
}

function createCartItems(p) {
    const cartInner = document.querySelector('.cart__inner');
    const cartItem = document.createElement('div');
    cartItem.className = 'cart__item';
    cartInner.append(cartItem);

    const cartProductImage = document.createElement('img');
    cartProductImage.className = 'cart__prod-img';
    cartProductImage.src = p.image;
    cartProductImage.alt = `image ${p.title}`;
    cartItem.append(cartProductImage);

    const cartProductTitle = document.createElement('h3');
    cartProductTitle.className = 'cart__prod-title';
    cartProductTitle.innerHTML = p.title;
    cartItem.append(cartProductTitle);

    const cartProductPrice = document.createElement('span');
    cartProductPrice.className = 'cart__prod-price';
    cartProductPrice.innerHTML = `${p.price} $`;
    cartItem.append(cartProductPrice);

    const cartProductCountBlock = document.createElement('div');
    cartProductCountBlock.className = 'cart__prod-count-block';
    cartItem.append(cartProductCountBlock);

    const cartProductCount = document.createElement('span');
    cartProductCount.className = 'cart__prod-count';

    const decrementCartProductCount = document.createElement('button');
    decrementCartProductCount.className = 'cart__prod-count-decrement';
    decrementCartProductCount.innerHTML = '-';
    decrementCartProductCount.addEventListener('click', () => {
        if (productsInCart[p.id] > 0) {
            productsInCart[p.id] = Number(productsInCart[p.id]) - 1;
            cartProductCount.innerHTML = cartProductCount.innerHTML - 1;
        }
        if (cartProductCount.innerHTML == 0) {
            delete productsInCart[p.id];
        }
    })
    cartProductCountBlock.append(decrementCartProductCount);

    cartProductCountBlock.append(cartProductCount);

    const incrementCartProductCount = document.createElement('button');
    incrementCartProductCount.className = 'cart__prod-count-increment';
    incrementCartProductCount.innerHTML = '+';
    incrementCartProductCount.addEventListener('click', () => {
        productsInCart[p.id] = Number(productsInCart[p.id]) + 1;
        cartProductCount.innerHTML = cartProductCount.innerHTML + 1;
    })
    cartProductCountBlock.append(incrementCartProductCount);

    const cartProductSum = document.createElement('span');
    cartProductSum.className = 'cart__prod-sum';
    cartProductSum.innerHTML = `${(Number(productsInCart[p.id]) * p.price).toLocaleString()} $`;
    cartItem.append(cartProductSum);

    const delProductBtn = document.createElement('button');
    delProductBtn.className = 'cart__prod-del';
    delProductBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
<path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
</svg>`;
    cartItem.append(delProductBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    openCart();
    closeCart();
})
