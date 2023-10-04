import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
const path = process.env.PUBLIC_URL;

export default function Department() {
	console.log('re-render');
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		//해당 useEffect구문은 컴포넌트 마운트시 한번만 동작됨
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				console.log(json.members);
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			{Department.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`img/${member.pic}`} alt='{member.name}' />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}
