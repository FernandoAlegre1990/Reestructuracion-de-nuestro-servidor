document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const url = new URL(window.location.href);

        if (selectedCategory) {
            url.searchParams.set('category', selectedCategory);
        } else {
            url.searchParams.delete('category');
        }

        url.searchParams.set('page', 1); // Reset page to 1 on category change
        window.location.href = url.toString();
    });

    // Set the selected category filter on page load
    const selectedCategory = categoryFilter.dataset.selectedCategory;
    if (selectedCategory) {
        categoryFilter.value = selectedCategory;
    }
});
