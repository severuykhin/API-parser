import React from 'react';
import Test from '../Test/Test';

const Index = () => {
	return (
		<div>
			<section className="hero is-light">
				<div className="hero-body">
					<div className="container">
					<h1 className="title">
						Парсеры публичных API
					</h1>
					<h2 className="subtitle">
						Yandex, Google
					</h2>
					</div>
				</div>
				<div className="container">
					<Test/>
				</div>
			</section>
		</div>
	);
};

export default Index;