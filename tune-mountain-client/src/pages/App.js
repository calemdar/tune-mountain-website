import React, {Component} from "react";

class App extends Component {

	constructor(props) {

		super(props);

		this.state = {
			text: "not loaded"
		};

		let array = ["a"];

		console.log(array);


	}

	componentDidMount() {

		this.setState({text: "hello world"});

	}

	render() {

		return(
			<div>
				{this.state.text}
			</div>
		);

	}

}

export default App;