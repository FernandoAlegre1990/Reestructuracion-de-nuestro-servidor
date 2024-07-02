const addToCartButtons = document.querySelectorAll('.addToCartBtn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', async () => {
    button.disabled = true; // Disable the button to prevent multiple clicks

    const productId = button.getAttribute('data-product-id'); // ID del producto
    const cartId = button.getAttribute('cID'); // ID del carrito

    try {
      const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST'
      });

      if (response.ok) {
        // Update the UI to reflect the change
        console.log('Producto agregado al carrito');
        alert('Producto agregado al carrito');
        // Update the cart count or display a success message
      } else {
        console.error('Error al agregar producto al carrito:', response.statusText);
        alert(`Error al agregar producto al carrito: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert(`Error al agregar producto al carrito: ${error.message}`);
    } finally {
      button.disabled = false; // Re-enable the button
    }
  });
});