import React from 'react'
// import Counters from '../Counters/Counters';
import Remetrika from '../Remetrika/Remetrika';
import RemetrikaSummary from '../RemetrikaComponents/RemetrikaSummary/RemetrikaSummary';
import RemetrikaPresets from '../RemetrikaComponents/RemetrikaPresets/RemetrikaPresets';

import GoogleSearch from '../GoogleSearch/GoogleSearch';
import Search from '../Search/Search';
import Index from '../Index/Index';
import { 
    BrowserRouter, 
	Switch,
	NavLink, 
    Route }    from 'react-router-dom';


class App  extends React.Component {

	render() {
		return(
			<div className="" >

				<BrowserRouter>
					<div>
						<nav className="navbar is-info"  aria-label="main navigation">
							<div className="navbar-brand">
								<NavLink 
									className="navbar-item" 
									to="/">
									{"[ api ]"}
								</NavLink>
								<NavLink 
									className="navbar-item" 
									to="/yandexorg">
									Yandex организации
								</NavLink>
								<NavLink 
									className="navbar-item" 
									to="/googleplaces">
									Google Places
								</NavLink>
								<NavLink 
									className="navbar-item" 
									to="/remetrika">
									REmetrika
								</NavLink>
							</div>
						</nav>
						<Switch>
							<Route path="/" exact   component={Index} />
							<Route path="/yandexorg"  component={Search} />
							<Route path="/googleplaces"  component={GoogleSearch} />
							<Route path="/remetrika"   component={Remetrika} />
							<Route path="/resummary"   component={RemetrikaSummary} />
							<Route path="/presets"   component={RemetrikaPresets} />
						</Switch>
					</div>	
				</BrowserRouter>

				{/* <GoogleSearch /> */}
				{/* <div className="container">
					<div className="row">
						<div className="col-lg-12">
							<Search />
						</div>
					</div>
				</div>	 */}
			</div>
		)
	}
}

export default App