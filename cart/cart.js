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
            productsInCart[p.id] = parseInt(productsInCart[p.id]) - 1;
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
        productsInCart[p.id] = parseInt(productsInCart[p.id]) + 1;
        productCount.innerHTML = parseInt(productCount.innerHTML) + 1;
    })
    productCountBlock.append(incrementProductCount);
}

function addToCart(id, count) {
    if (!Object.keys(productsInCart).includes(id))
        productsInCart[id] = parseInt(count);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

