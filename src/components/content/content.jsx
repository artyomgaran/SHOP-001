/* eslint-disable react/prop-types */
export const Content = ({ children, error }) => (
	<>
		{error ? (
			<>
				<h3>Ошибка</h3>
				<div> {error}</div>
			</>
		) : (
			children
		)}
	</>
);
