Области хранения данных:
-база данных на json-server
-BFF
-redux store

Сущности приложения:
-пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использования на клиенте)
-товар: БД (список товаров), стор (отображение в браузере)
-категория товара: БД(список категорий), стор (фильтрация на клиенете)
-корзина: БД (текущее состояние корзины)

Таблицы БД:
-пользователи - users: id / login / password / registed_at / role_id
-роли - roles: id / name
Примеры:
Гость — может просматривать товары, но для заказа нужно зарегистрироваться
Клиент — зарегистрированный пользователь, может оформлять заказы
Администратор — доступна админ-панель для добавления и редактирования товаров
(по умолчанию при регистрации назначается роль "Клиент")
-товары - items: id / name / img_url / structure / weight / sizes / print / quantity / price / category_id
-категории — categories_items: id / name
(например: Футболки, Худи, Аксессуары)
-корзина — cart_items : id / user_id / item_id / quantity

Схема состояния на BFF:
-сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):
-user: id / login / role_id /session
-items: массив item: id / name / imageUrl / price / quantity
-item: id / name / imageUrl / composition / weight / sizes / print / quantity / price / categoryId
-categories: массив category: id / name
-cart: массив cartItem: item_id / name / price / quantity
