import { Redirect } from 'react-router'
import Navbar from "./navbar"
import { serverurl } from "./config"
import Trusted from "./trusted.js"
import HomeLeft from "./home-left.js"
import Addi from "./addi.js"
import Track from "./track.js"
import Item from "./item.js"
import './styles/home.css'
import { Switch, Route } from 'react-router-dom';
var axios = require('axios');
var React = require('react')
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.token,
			user: {},
			users: [],
			cusrs: [],
			items: [],
		};
	}
	componentDidMount() {
		if (this.state.token) {
			this.getUser(this.state.token)
			this.getAllUser()
			this.getItems()

		}
	}
	getUser = (token) => {
		let url = serverurl + '/lostfound/token/' + token + '/';
		axios.get(url)
			.then((response) => {
				let user = response.data.user
				this.setState({ user: user })
				this.setState({ users: [...this.state.users, user.id, ...user.users] })
				this.setState({ cusrs: [...this.state.cusrs, ...user.users] })
			})
			.catch(function (error) {
			})
	}
	getAllUser = () => {
		let url = serverurl + '/lostfound/usr/'
		axios.get(url)
			.then((response) => {
				let friends = this.state.users
				let usr = [];
				response.data.map(x => {
					let flag = 1;
					friends.map(y => {
						if (y === x.id) flag = 0;
					})
					if (flag) {
						usr.push(x);
					}
				})
				this.setState({ users: usr })
			})
			.catch(function (error) {
			})
	}
	getItems = () => {
		let url = serverurl + '/lostfound/i/'
		axios.get(url)
			.then((response) => {
				this.setState({ items: response.data })
			})
			.catch(function (error) {
			})
	}
	logout = () => {
		delete localStorage.token
		this.setState({ token: localStorage.token });
	}
	render() {
		if (this.state.token) {
			return (
				<div className="home-root">
					<Navbar logout={this.logout} />
					<div className="home-body">
						<div className="home-left">
							<HomeLeft />
						</div>

							<div className="home-center">
								<Switch>
									<Route path="/item/:number" component={(params) => {
										return (<Item user={this.state.user} token={this.state.token} id={params}/>)
									}} />
									<Route  path="/additem" component={() => {
										return (<Addi user={this.state.user} token={this.state.token} />)
									}} />
									<Route exact path="/" component={() => {
										return (<Track obj={this.state.items} user={this.state.user} />)
									}} />
								</Switch>
							</div>

						<div className="home-right">
							<Trusted getUser={this.getUser} getAllUser={this.getAllUser} users={this.state.users} token={this.state.token} cusrs={this.state.cusrs} user={this.state.user} />
						</div>
					</div>
				</div>
			)

		}
		else {
			return (
				<Redirect to='/login' />
			)
		}
	}
}

export default Home;