import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;
// 1.useEffect로 컴포넌트 마운트되자마자 fetch외부데이터 가져옴
// 2.데이터가 다 받아지면 useState로 state에 해당 값 담아줌
// 3.return문 안쪽에 state값을 map으로 반복돌면서 JSX출력

export default function Department() {
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			<h2 className='wow'>Members</h2>
			<h3 className='woww'>
				Lorem ipsum dolor sit amet consectetur <br />
				adipisicing elit. Impedit similique accusamus, consequuntur molestiae eveniet doloribus
				<br />
				error esse neque rem alias facilis vitae corporis magnam iure nisi deleniti? Eum, provident
				<br />
				doloribus?
			</h3>

			<div className='memberBox'>
				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
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
	1. hook의 개념
	- 리액트에서는 크게 2가지 종류의 파일이 존재
	 - 컴포넌트 ( 화면에 가상돔을 렌더링하는 JSX를 무조건 리턴 )
	 - hook ( JSX를 리턴하는것이 아닌 각 컴포넌트마다 자주쓰는 기능의 함수나 특정 값을 리턴하는 기능파일 )

	2. useState, useEffect, useRef ( 리액트에서 제일 많이 쓰는 기본 hook )
		- useState : 화면의 렌더링을 담당하는 중요한 정보를 담아주고 변경해주는 기능의 훅 (state가 변경되면 컴포넌트는 재호출 되면서 화면 재랜더링)
		- useEffect : 컴포넌트의 생성, 변경, 소멸시마다 (컴포넌트의 생성주기마다) 특정 구문을 호출할수 있는 hook
		- useRef : 참조 객체에 실시간으로 특정 정보값을 담기위한 hook ( 해당 렌더링 사이클에서 최신 가상돔을 담을때, 특정값을 담아두고 변경을 할때 컴포넌트를 재랜더링 시키고 싶지 않을떄 (모션))

	3. 컴포넌트가 하는 역할 (JSX)
	- 자바스크립트 동적 DOM을 만들때 편의성을 위해 HTML 형식을 따와서 편하게 동적 DOM생성을 위한 리액트만의 표현식

	4. fetch문을 useEffect 안쪽에서 호출하는 이유
	- 가상돔 생성은 리액트 기반의 스크립트가 처리해주지만 외부 데이터를 가져오는 것은 web api ( 브라우저 ) 가 처리하기 떄문에
	- 컴포넌트가 실제 브라우저상에 마운트가 되고 브라우저가 작업 준비가 되야지만 fetch를 실행할 수 있기 떄문에
	- useEffect 컴포넌트가 마운트 되야지만 CSR방식으로 외부 데이터를 가져올 수 있음.

	컴포넌트 작성 순서
	import로 외부 모듈, 컴포넌트 불러오기

	export default funciton 컴포넌트 이름(){
		필요시 hook 호출 ( hook안에서 hook호출 불가, 핸들러 안쪽에서 호출불가)

		필요시 핸들러 함수 정의

		useEffect(()=> {
			핸들러 함수 호출 ( fetch, 이벤트연결 )
		})

		return JSX

	}

fetch : ES6에서 기본 문법으로 포함된 동기적으로 외부 데이터를 가져오는 내장함수

fetch는 promise반환
promise가 반환 되야지 .then 구문으로 호출가능
.then 구문을 호출해여지만 동기적으로 다음코드 실행가능


JSON ( Javascript Object Notation ) 자바스크리브 객체 표현식
	- 자바스크립트의 객체를 문자열 형태로 관리하는 데이터 형식
	- 문자형식으로 되어있는 JSON는 다시 객체형식으로 변환 (parsing)


*/
