document.addEventListener('DOMContentLoaded', () => {
    loadRemoveFromCartButtons();
});

function loadRemoveFromCartButtons() {
    const removeFromCartButtons = document.querySelectorAll('.removeFromCartBtn');

    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-product-id');
            const cartId = button.getAttribute('data-cart-id');

            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // Producto eliminado del carrito, actualizar la vista
                    console.log('Producto eliminado del carrito');
                    alert('Producto eliminado del carrito');
                    // Eliminar el producto del DOM
                    button.closest('li').remove();
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
}
