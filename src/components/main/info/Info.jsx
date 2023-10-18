import { useSelector } from 'react-redux';
import './Info.scss';

function Info() {
	const { data } = useSelector((store) => store.flickr);
	return (
		<section className='info'>
			{data.map((pic, idx) => {
				return (
					<article key={idx}>
						<h2>{pic.title}</h2>
					</article>
				);
			})}
			<div className='wrap'>
				<article>1</article>
				<article>2</article>
				<article>3</article>
				<article>4</article>
				<article>5</article>
				<article>6</article>
			</div>
		</section>
	);
}

export default Info;
