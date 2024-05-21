document.addEventListener('DOMContentLoaded', () => {
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const categoryFilter = document.getElementById('categoryFilter');

    applyFilterBtn.addEventListener('click', () => {
        const selectedCategory = categoryFilter.value;
        let url = '/';

        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }

        window.location.href = url;
    });

    const clearFilter = document.getElementById('clearFilter');
    clearFilter.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/';
    });
});