import { useMemo } from 'react';

export const useFilteredItems = (
	items,
	selectedCategoryId,
	selectedFilter,
	searchQuery,
) => {
	return useMemo(() => {
		let filtered = [...items];

		// фильтр по категории
		if (selectedCategoryId != null) {
			filtered = filtered.filter((item) => item.categoryId === selectedCategoryId);
		}

		// поиск по названию
		if (searchQuery) {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// сортировка
		if (selectedFilter === 'Подешевле') {
			filtered.sort((a, b) => a.price - b.price);
		} else if (selectedFilter === 'Подороже') {
			filtered.sort((a, b) => b.price - a.price);
		}

		return filtered;
	}, [items, selectedCategoryId, selectedFilter, searchQuery]);
};
