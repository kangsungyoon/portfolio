import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const refInput = useRef(null);
	const [Pics, setPics] = useState([]);
	const my_id = '164021883@N04';

	const fetchData = async (opt) => {
		let url = '';
		const api_key = 'df39eea7518a5a4528b7bc5488282b35';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 500;

		//fetching함수 호출시 타입값이 있는 객체를 인수로 전달하면 해당 타입에 따라 호출 URL이 변경되고
		//해당URL을 통해 받아지는 데이터로 달라짐
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		const data = await fetch(url);
		const json = await data.json();

		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다.');
		}
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (refInput.current.value.trim() === '') {
						return alert('검색어를 입력하세요.');
					}

					fetchData({ type: 'search', tags: refInput.current.value });
					refInput.current.value = '';
				}}
			>
				<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
				<button>검색</button>
			</form>
			<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
			<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>

			<div className='picFrame'>
				<Masonry
					elementType={'div'}
					options={{ transitionDuration: '0.5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
											onError={(e) => {
												//만약 사용자가 프로필 이미지를 올리지 않았을때 엑박이 뜨므로
												//onError이벤트를 연결해서 대체이미지 출력
												e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
											}}
										/>
										<span onClick={() => fetchData({ type: 'user', id: data.owner })}>
											{data.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
