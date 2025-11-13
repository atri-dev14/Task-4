document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: "Wireless Headphones", category: "electronics", price: 199, rating: 4.5, img: "https://loremflickr.com/300/200/headphones,wireless?random=1" },
        { id: 2, name: "Men's T-Shirt", category: "apparel", price: 25, rating: 4.2, img: "https://loremflickr.com/300/200/t-shirt,apparel?random=2" },
        { id: 3, name: "JavaScript Guide", category: "books", price: 45, rating: 4.8, img: "https://loremflickr.com/300/200/book,javascript?random=3" },
        { id: 4, name: "Smartphone", category: "electronics", price: 699, rating: 4.7, img: "https://loremflickr.com/300/200/smartphone,electronics?random=4" },
        { id: 5, name: "Leather Jacket", category: "apparel", price: 150, rating: 4.4, img: "https://loremflickr.com/300/200/jacket,leather?random=5" },
        { id: 6, name: "Sci-Fi Novel", category: "books", price: 22, rating: 4.6, img: "https://loremflickr.com/300/200/book,scifi?random=6" },
        { id: 7, name: "Bluetooth Speaker", category: "electronics", price: 85, rating: 4.3, img: "https://loremflickr.com/300/200/speaker,bluetooth?random=7" },
        { id: 8, name: "Running Shoes", category: "apparel", price: 78, rating: 4.1, img: "https://loremflickr.com/300/200/shoes,running?random=8" },
        { id: 9, name: "Coffee Maker", category: "electronics", price: 55, rating: 4.0, img: "https://loremflickr.com/300/200/coffeemaker,kitchen?random=9" }
    ];

    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const sortFilter = document.getElementById('sort-filter');

    function renderProducts(productsToRender) {
        productList.innerHTML = '';
        if (productsToRender.length === 0) {
            productList.innerHTML = '<p id="no-results">No products found matching your criteria.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h4>${product.name}</h4>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-rating">Rating: ${product.rating} ★</p>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    function applyFiltersAndSort() {
        let filteredProducts = [...products];
        
        const category = categoryFilter.value;
        const price = Number(priceFilter.value);
        const sortBy = sortFilter.value;

        priceValue.textContent = `$${price}`;

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        filteredProducts = filteredProducts.filter(product => product.price <= price);

        switch (sortBy) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        renderProducts(filteredProducts);
    }

    categoryFilter.addEventListener('change', applyFiltersAndSort);
    priceFilter.addEventListener('input', applyFiltersAndSort);
    sortFilter.addEventListener('change', applyFiltersAndSort);

    applyFiltersAndSort();
});