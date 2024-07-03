document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('#product-container');

    function filterByCategory(category) {
        fetch(`/api/products?category=${category}`)
            .then(response => response.json())
            .then(data => {
                productContainer.innerHTML = ''; // Clear the current products

                if (data.products.length === 0) {
                    productContainer.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
                    return;
                }

                data.products.forEach(product => {
                    const productHtml = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                                    <p class="card-text"><strong>Categoría:</strong> ${product.category}</p>
                                    <p class="card-text"><strong>Código:</strong> ${product.code}</p>
                                    <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
                                    <a href="/products/${product._id}" class="btn btn-light">Ver</a>
                                    <button class="addToCartBtn btn btn-primary" data-product-id="${product._id}" data-cart-id="{{../cart}}">Agregar al Carrito</button>
                                </div>
                            </div>
                        </div>
                    `;
                    productContainer.insertAdjacentHTML('beforeend', productHtml);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                productContainer.innerHTML = '<p>Hubo un error al cargar los productos. Por favor, inténtelo de nuevo.</p>';
            });
    }

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.trim().toLowerCase();
            filterByCategory(category);
        });
    });
});
