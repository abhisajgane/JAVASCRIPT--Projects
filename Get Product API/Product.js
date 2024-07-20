document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const cartButton = document.getElementById('cart-button');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartDropdown = document.getElementById('cart-dropdown');
    const logoutButton = document.getElementById('logout-button');
    const aboutButton = document.getElementById('about-button');
    const aboutModal = document.getElementById('about-modal');
    const closeAboutModalButton = document.getElementById('close-about-modal');
    let cartItems = [];

    logoutButton.addEventListener('click', () => {
        const userConfirmed = confirm("Are you sure you want to logout?");
        if (userConfirmed) {
            window.location.href = 'index.html';
        }
    });

    aboutButton.addEventListener('click', (event) => {
        event.preventDefault();
        aboutModal.classList.remove('hidden');
    });

    closeAboutModalButton.addEventListener('click', () => {
        aboutModal.classList.add('hidden');
    });

    const fetchAndRenderProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const renderProducts = (products) => {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    };

    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('w-full', 'h-64', 'bg-cover', 'bg-center');
        imgContainer.style.backgroundImage = `url(${product.image})`;

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('px-6', 'py-4');

        const title = document.createElement('h3');
        title.classList.add('font-bold', 'text-xl', 'mb-2');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.classList.add('text-gray-700', 'text-base');
        price.textContent = `$${product.price.toFixed(2)}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('bg-green-900', 'hover:bg-green-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'mt-2');
        addToCartBtn.textContent = 'Add to Cart';

        addToCartBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: product.id, quantity: 1 }),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Product added to cart successfully!');
                    console.log(data);

                    addProductToCart(product);
                } else {
                    const errorData = await response.json();
                    alert(`Failed to add product to cart: ${errorData.message}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        });

        contentContainer.appendChild(title);
        contentContainer.appendChild(price);
        contentContainer.appendChild(addToCartBtn);

        card.appendChild(imgContainer);
        card.appendChild(contentContainer);

        return card;
    };

    const addProductToCart = (product) => {
        cartItems.push(product);
        cartCount.textContent = cartItems.length;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = 'No items in cart.';
        } else {
            renderCartItems();
        }
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('mb-2', 'p-2', 'border', 'border-gray-200', 'rounded');
            cartItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(cartItem);
        });
    };

    cartButton.addEventListener('click', () => {
        cartDropdown.classList.toggle('hidden');
    });

    fetchAndRenderProducts();
});
