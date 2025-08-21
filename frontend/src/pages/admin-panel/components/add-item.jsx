/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addItem, editItem } from '../../../action';
import { useEffect } from 'react';
import { request } from '../../../utils';
import { mapItemFormData } from '../../../helpers';

import styles from '../admin-panel.module.css';

export const AddItem = ({
	categories,
	isExpanded,
	onExpand,
	onCollapse,
	editableItem,
}) => {
	const dispatch = useDispatch();

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

	const handleBack = () => {
		reset(); // очищаем форму
		onCollapse(); // сворачиваем форму и сбрасываем editableItem
	};

	const onSubmit = async (formData) => {
		const preparedData = mapItemFormData(formData);
		try {
			let response;

			if (editableItem) {
				// Редактирование
				response = await request(
					`/api/items/${editableItem.id}`,
					'PATCH',
					preparedData,
				);
			} else {
				// Добавление
				response = await request('/api/items/', 'POST', preparedData);
			}

			const { error, data } = response;
			const result = data;

			if (error) {
				alert(`Ошибка запроса: ${error}`);
				return;
			}

			// Диспатчим в редакс
			if (editableItem) {
				dispatch(editItem(result));
				alert('Товар успешно изменён');
			} else {
				dispatch(addItem(result));
				alert('Товар успешно добавлен');
			}
			reset();
			onCollapse();
		} catch (err) {
			alert(`Ошибка сети: ${err.message}`);
		}
	};

	return (
		<div
			className={`${styles.addItemWrapper} ${isExpanded ? styles.expanded : ''}`}
			onClick={!isExpanded ? onExpand : undefined}
		>
			<form className={styles.addItemForm} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={styles.h2}>
					{editableItem ? 'Изменение товара' : 'Добавление товара'}
				</h2>

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
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
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
