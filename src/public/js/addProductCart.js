const addToCartButtons = document.querySelectorAll('.addToCartBtn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-product-id');
        const cartId = button.getAttribute('data-cart-id');

        console.log('Product ID:', productId); // Debug
        console.log('Cart ID:', cartId);       // Debug

        try {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST'
            });

            if (response.ok) {
                console.log('Producto agregado al carrito');
                alert('Producto agregado al carrito');
            } else {
                console.error('Error al agregar producto al carrito:', response.statusText);
                alert('Error al agregar producto al carrito');
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            alert('Error al agregar producto al carrito');
        }
    });
});
