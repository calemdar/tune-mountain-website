import React, {Component} from "react";
import InputManager from "tune-mountain-input-manager";

class App extends Component {

	constructor(props) {

		super(props);

		this.state = {
			text: "not loaded"
		};

		let array = ["a"];

		this.inputManager = new InputManager(
			document,
			{
				"a": [
					"Trick",
					"DoAThing"
				],
				" ": ["Jump"]
			},
			{
				"userID": "APerson1234",
				"sessionID": "ABC!@#ABC"
			}
		);

		this.inputManager.getObservable().subscribe(actionEvent => console.log(actionEvent.toString()));

		console.log(array);


	}

	componentDidMount() {

		this.setState({text: "hello world"});

	}

	render() {

		const url = '/spotify-service/login';

		const handleClick = () => {


			fetch(url).then(r => r.json()).then(r => console.log(r));

		};

		return(
			<div>
				<button onClick={handleClick}>Login with Spotify</button>
				<br/>
				<a href={url}>Link to spotify</a>
				<br/>
				<button onClick={() => fetch('/test').then(r => r.json()).then(r => console.log(r))}>test url</button>
			</div>
		);

	}

}

export default App;