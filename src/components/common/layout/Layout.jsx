import styles from './Layout.module.scss';
import clsx from 'clsx';

export default function Layout({ title, children, styleName }) {
	return (
		<section className={clsx(styles.layout, styleName)}>
			<figure></figure>

			<div className={clsx(styles.content)}>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}
