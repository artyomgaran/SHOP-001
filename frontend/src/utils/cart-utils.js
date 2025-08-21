import { addToCart, deleteCartItem, removeCart, setCart } from '../action';
import { request } from '../utils';

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
	dispatch(addToCart(item)); // В редаксе будет проверка
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
// создание заказа и отправка на сервер
export const handleCreateOrder = async (dispatch, cart, amount, userId, userLogin) => {
	if (!userLogin) {
		throw new Error('Авторизуйтесь для оформления заказа');
	}

	const data = {
		user_id: userId,
		items: cart,
		total_price: amount,
	};

	try {
		const { error, data: order } = await request('/api/orders', 'POST', data);

		if (error) {
			throw new Error(`Ошибка запроса. ${error}`);
		}

		clearCartStorage();
		dispatch(removeCart());

		return order;
	} catch (err) {
		console.error('Ошибка при создании заказа:', err);
		throw err;
	}
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
