document.addEventListener('DOMContentLoaded', () => {
    const deleteProductButtons = document.querySelectorAll('.deleteProductBtn');

    deleteProductButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-product-id'); // ID del producto
            const cartId = button.getAttribute('data-cart-id'); // ID del carrito

            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Producto eliminado del carrito');
                    // Recargar la página para ver los cambios
                    window.location.reload();
                } else {
                    console.error('Error al eliminar producto del carrito:', response.statusText);
                    alert('Error al eliminar producto del carrito');
                }
            } catch (error) {
                console.error('Error al eliminar producto del carrito:', error);
                alert('Error al eliminar producto del carrito');
            }
        });
    });

    // Manejar el evento de vaciar carrito
    const emptyCartBtn = document.querySelector('#emptyCartBtn');

    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', async () => {
            const cartId = emptyCartBtn.getAttribute('data-cart-id'); // ID del carrito

            try {
                const response = await fetch(`/api/carts/${cartId}/empty`, {
                    method: 'POST'
                });

                if (response.ok) {
                    alert('Carrito vaciado satisfactoriamente');
                    // Recargar la página para ver los cambios
                    window.location.reload();
                } else {
                    console.error('Error al vaciar el carrito:', response.statusText);
                    alert('Error al vaciar el carrito');
                }
            } catch (error) {
                console.error('Error al vaciar el carrito:', error);
                alert('Error al vaciar el carrito');
            }
        });
    }
});
