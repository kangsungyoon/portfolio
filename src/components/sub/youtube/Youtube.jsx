import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Youtube = useSelector((store) => store.youtube.data);

	return (
		<>
			<Layout title={'Youtube'}>
				<div className='wrab'>
					{Youtube.map((data, idx) => {
						let tit = data.snippet.title;
						let desc = data.snippet.description;
						let date = data.snippet.publishedAt;

						return (
							<article key={idx}>
								<div className='picBox'>
									<Link to={`/detail/${data.id}`}>
										<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
									</Link>
								</div>
								<div className='titBox'>
									<h2>{tit.length > 60 ? tit.substr(0, 60) + '...' : tit}</h2>
								</div>
								<div className='conBox'>
									<p>{desc.length > 180 ? desc.substr(0, 180) + '...' : desc}</p>
									<span>{date.split('T')[0].split('-').join('.')}</span>
								</div>
							</article>
						);
					})}
				</div>
			</Layout>
		</>
	);
}
