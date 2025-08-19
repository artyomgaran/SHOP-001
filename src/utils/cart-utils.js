import { addToCart, deleteCartItem, removeCart, setCart } from '../action';

// Добавление товара с проверкой на дубли (по id и size)
export const handleAddToCart = (dispatch, product, selectedSize) => {
	const item = {
		id: product.id,
		imgUrl: product.imgUrl,
		name: product.name,
		size: selectedSize,
		price: product.price,
		amount: 1,
	};

	// Обновим localStorage вручную
	const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

	const existingIndex = storedCart.findIndex(
		(i) => i.id === item.id && i.size === item.size,
	);

	if (existingIndex >= 0) {
		storedCart[existingIndex].amount += 1;
	} else {
		storedCart.push(item);
	}

	localStorage.setItem('cart', JSON.stringify(storedCart));
	dispatch(addToCart(item)); // В редаксе всё равно будет проверка
};

export const handleDeleteFromCart = (dispatch, itemToDelete) => {
	const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

	const existingIndex = storedCart.findIndex(
		(i) => i.id === itemToDelete.id && i.size === itemToDelete.size,
	);

	if (existingIndex >= 0) {
		if (storedCart[existingIndex].amount > 1) {
			storedCart[existingIndex].amount -= 1;
		} else {
			storedCart.splice(existingIndex, 1);
		}
	}

	localStorage.setItem('cart', JSON.stringify(storedCart));

	dispatch(deleteCartItem(itemToDelete));
};

export const handleCreateOrder = (dispatch, cart, user) => {
	if (!user) {
		throw new Error('Авторизуйтесь для оформления заказа');
	}

	//TODO запрос на сервер
	clearCartStorage();
	dispatch(removeCart());
};

// Загрузка корзины из localStorage в redux
export const loadCartFromStorage = (dispatch) => {
	const stored = localStorage.getItem('cart');
	if (stored) {
		const cart = JSON.parse(stored);
		dispatch(setCart(cart));
	}
};

// Очистка localStorage корзины (например, при logout)
export const clearCartStorage = () => {
	localStorage.removeItem('cart');
};
