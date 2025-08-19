/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem } from '../../../action';
import { server } from '../../../bff';
import { selectUserSession } from '../../../selectors';
import { useEffect } from 'react';

import styles from '../admin-panel.module.css';

export const AddItem = ({
	categories,
	isExpanded,
	onExpand,
	onCollapse,
	editableItem,
}) => {
	// Если не передали категории, то это ошибка
	const addItemSchema = yup.object().shape({
		name: yup.string().required('Введите название'),
		imgUrl: yup.string().url('Неверный URL').required('Укажите адрес картинки'),
		structure: yup.string().required('Укажите состав'),
		weight: yup.string().required('Укажите плотность'),
		sizes: yup.string().required('Укажите размеры'),
		print: yup.string().required('Укажите тип принта'),
		quantity: yup.number().typeError('Укажите число').required('Укажите количество'),
		price: yup.string().required('Укажите цену'),
		categoryId: yup.string().required('Выберите категорию'),
	});

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			imgUrl: '',
			structure: '',
			weight: '',
			sizes: '',
			print: '',
			quantity: '',
			price: '',
			categoryId: '',
		},
		resolver: yupResolver(addItemSchema),
	});

	useEffect(() => {
		if (editableItem) {
			Object.entries(editableItem).forEach(([key, value]) => {
				if (value !== undefined) {
					setValue(key, String(value));
				}
			});
		}
	}, [editableItem, setValue]);

	const dispatch = useDispatch();

	const userSession = useSelector(selectUserSession);

	const handleBack = () => {
		reset(); // очищаем форму
		onCollapse(); // сворачиваем форму и сбрасываем editableItem
	};

	const onSubmit = (formData) => {
		const preparedData = {
			...formData,
			sizes: formData.sizes.split(',').map((s) => s.trim()), // строка -> массив
		};

		if (editableItem) {
			// РЕДАКТИРОВАНИЕ
			server
				.editItem(editableItem.id, preparedData, userSession)
				.then(({ error, res }) => {
					if (error) {
						alert(`Ошибка запроса. ${error}`);
						return;
					}

					const normalized = {
						...res,
						imgUrl: res.img_url,
						categoryId: res.category_id,
					};

					dispatch(editItem(normalized));
					alert('Товар успешно изменён');
					onCollapse();
					reset();
				});
		} else {
			// ДОБАВЛЕНИЕ
			server.createItem(preparedData, userSession).then(({ error, res }) => {
				if (error) {
					alert(`Ошибка запроса. ${error}`);
					return;
				}

				const normalized = {
					...res,
					imgUrl: res.img_url,
					categoryId: res.category_id,
				};

				dispatch(addItem(normalized));
				alert('Товар успешно добавлен');
				reset();
			});
		}
	};

	return (
		<div
			className={`${styles.addItemWrapper} ${isExpanded ? styles.expanded : ''}`}
			onClick={!isExpanded ? onExpand : undefined}
		>
			<form className={styles.addItemForm} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={styles.h2}>Добавление товара</h2>

				<input
					className={styles.inputAdd}
					placeholder="Название"
					{...register('name')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.name && (
					<p className={styles.errorsFormMessage}>{errors.name.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Адрес картинки"
					{...register('imgUrl')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.imgUrl && (
					<p className={styles.errorsFormMessage}>{errors.imgUrl.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Состав"
					{...register('structure')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.structure && (
					<p className={styles.errorsFormMessage}>{errors.structure.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Плотность ткани"
					{...register('weight')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.weight && (
					<p className={styles.errorsFormMessage}>{errors.weight.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Размеры"
					{...register('sizes')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.sizes && (
					<p className={styles.errorsFormMessage}>{errors.sizes.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Принт"
					{...register('print')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.print && (
					<p className={styles.errorsFormMessage}>{errors.print.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Количество"
					{...register('quantity')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.quantity && (
					<p className={styles.errorsFormMessage}>{errors.quantity.message}</p>
				)}

				<input
					className={styles.inputAdd}
					placeholder="Цена"
					{...register('price')}
					onClick={(e) => e.stopPropagation()}
				/>
				{errors.price && (
					<p className={styles.errorsFormMessage}> {errors.price.message}</p>
				)}

				<select
					{...register('categoryId')}
					onClick={(e) => e.stopPropagation()}
					className={styles.select}
				>
					<option value="">Выберите категорию</option>
					{categories.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
				{errors.categoryId && (
					<p className={styles.errorsFormMessage}>
						{errors.categoryId.message}
					</p>
				)}

				<button
					className={styles.saveButton}
					type="submit"
					onClick={(e) => e.stopPropagation()}
				>
					{editableItem ? 'Сохранить изменения' : 'Сохранить'}
				</button>
				{isExpanded && (
					<button
						type="button"
						className={styles.backButton}
						onClick={handleBack}
					>
						← Назад
					</button>
				)}
			</form>
		</div>
	);
};
