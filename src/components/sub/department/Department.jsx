import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import styles from './Department.module.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	console.log('re-render');
	const [Department, setDepartment] = useState([]);
	const [History, setHistory] = useState([]);

	useEffect(() => {
		//해당 useEffect구문은 컴포넌트 마운트시 한번만 동작됨
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.members);
				setDepartment(json.members);
			});

		fetch(`${path}/DB/history.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.history);
				setHistory(json.history);
			});
	}, []);

	return (
		<Layout title={'Department'} styleName={styles.department}>
			<div className={styles.historyBox}>
				{History.map((data, idx) => {
					return (
						<article key={idx}>
							{/* {2016: 배열} */}
							<h2>{Object.keys(data)[0]}</h2>
							<ul>
								{Object.values(data)[0].map((data, idx) => {
									return <li key={idx}>{data}</li>;
								})}
							</ul>
						</article>
					);
				})}
			</div>
			<div className={styles.memberBox}>
				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className={styles.pic}>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

/*
	1. 외부데이터를 fetch를 통해서 가져오는 법 
	2. useEffect를 이용해서 컴포넌트 마운트시 한번만 외부데이터 fetching
	3. 받아온 외부데이터는 useState를 통해서 state에 담아주고, state변경에 따라 화면 렌더링
	4. state에 담겨있는 데이터로 map으로 반복돌면서 동적으로 돔생성 (JSX)

	Object.keys(객체) : 객체의 key값만 배열로 반환
	Object.values(객체) : 해당객체의 value값만 배열로 반환
*/
