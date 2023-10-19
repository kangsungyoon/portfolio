import './News.scss';
import { useState, useEffect } from 'react';

function News() {
	const dummyData = [
		{
			title: 'title4',
			content: 'Here comes content description in detail4.',
			data: new Date(),
		},
		{
			title: 'title3',
			content: 'Here comes content description in detail3.',
			data: new Date(),
		},
		{
			title: 'title2',
			content: 'Here comes content description in detail2.',
			data: new Date(),
		},
		{
			title: 'title1',
			content: 'Here comes content description in detail1.',
			data: new Date(),
		},
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	};
	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		setPost(getLocalData());
	}, []);

	return (
		<section className='news myScroll'>
			<h2>News</h2>
			<div className='postWrap'>
				{Post.map((el, idx) => {
					if (idx >= 4) return null;
					else
						return (
							<article key={idx}>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</article>
						);
				})}
			</div>
		</section>
	);
}

export default News;
