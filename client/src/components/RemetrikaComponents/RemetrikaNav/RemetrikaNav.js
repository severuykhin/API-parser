import React from 'react';
import { NavLink } from 'react-router-dom';

const RemetrikaNav = () => {
	return (
		<div className="remetrika-nav"> 
			<nav className="panel">
				<p className="panel-heading">
					repositories
				</p>
				<NavLink 
					to="/remetrika"
					className="panel-block is-active">
					<span className="panel-icon">
					<i className="fas fa-chart-pie" aria-hidden="true"></i>
					</span>
					Общая статистика
				</NavLink>
				<NavLink
					to="/presets" 
					className="panel-block">
					<span className="panel-icon">
					<i className="fas fa-chart-bar" aria-hidden="true"></i>
					</span>
					Отчеты по шаблонам
				</NavLink>
				<NavLink 
					className="panel-block"
					to="/resummary">
					<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
					</span>
					Общий отчет
				</NavLink>
				<a className="panel-block">
					<span className="panel-icon">
					<i className="fas fa-book" aria-hidden="true"></i>
					</span>
					jgthms.github.io
				</a>
				<a className="panel-block">
					<span className="panel-icon">
					<i className="fas fa-code-fork" aria-hidden="true"></i>
					</span>
					daniellowtw/infboard
				</a>
				<a className="panel-block">
					<span className="panel-icon">
					<i className="fas fa-code-fork" aria-hidden="true"></i>
					</span>
					mojs
				</a>
			</nav>
		</div>
	);
};

export default RemetrikaNav;