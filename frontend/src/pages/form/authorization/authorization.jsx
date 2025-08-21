import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setUser } from '../../../action';
import { selectUserRole } from '../../../selectors';
import { ROLE } from '../../../constants';
import { useResetForm } from '../../../hooks';
import { request, saveUserToStorage } from '../../../utils';

import styles from '../form.module.css';

export const Authorization = () => {
	const authFormSchema = yup.object().shape({
		login: yup
			.string()
			.required('Заполните логин')
			.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
			.min(3, 'Неверно заполнен логин. Минимум 3 символа')
			.max(15, 'Неверно заполнен логин. Максимум 15 символов'),

		password: yup
			.string()
			.required('Заполните пароль')
			.matches(
				/^[\w#%]+$/,
				'Неверный заполнен пароль. Допускаются буквы, цифры и знаки # %',
			)
			.min(6, 'Неверный заполнен пароль. Минимум 6 символов')
			.max(30, 'Неверный заполнен пароль. Максимум 30 символов'),
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const onSubmit = ({ login, password }) => {
		request('/api/auth/login', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса. ${error}`);
					return;
				}

				dispatch(setUser(user));
				saveUserToStorage(user);
			},
		);
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	useResetForm(reset);

	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.authorization}>
			<h2 className={styles.h2}>Авторизация</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={styles.input}
					type="text"
					placeholder="Логин"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<input
					className={styles.input}
					type="password"
					placeholder="Пароль"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<button className={styles.button} type="submit" disabled={!!formError}>
					Войти
				</button>
				{errorMessage}
			</form>
		</div>
	);
};
