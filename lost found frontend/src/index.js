import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './login'
import home from './home'
import signup from './signup'
import 'semantic-ui-css/semantic.min.css';
import Track from './track';

render(
	<Router>
		<Switch>
			
			<Route exact path="/login" component={login} />
			<Route exact path="/signup" component={signup} />
			<Route path="/" component={home} />
			{/* <Route path="additem" component={home} /> */}
			{/* <Route path="track" component={home} /> */}
		</Switch>
	</Router>, document.getElementById('root')
);