import React, { Component } from 'react'
import ReactDOM from "react-dom"

// function BoilingVerdict(props) {
// 	return (props.celsius >= 100) ? (<p>The water would boil.</p>) : <p>The water would not boil.</p>
// }

// class Calculator extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.handleChange = this.handleChange.bind(this);
// 		this.state = { 
// 			temperature: '' 
// 		};
// 	}

// 	handleChange(e) {
// 		this.setState({ [e.target.name]: e.target.value });
// 	}

// 	render() {
// 		const { temperature } = this.state;
// 		return (
// 			<div>
// 				<input value={temperature} onChange={this.handleChange} name="temperature" />
// 				<BoilingVerdict celsius={parseFloat(temperature)} />
// 			</div>
// 		);
// 	}
// }

// ReactDOM.render(<Calculator />, document.getElementById('root'));

//=======================================

// const scaleNames = {
// 	c: 'Celsius',
// 	f: 'Fahrenheit'
// };

// class TemperatureInput extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.handleChange = this.handleChange.bind(this);
// 		this.state = { 
// 			temperature: '' 
// 		};
// 	}

// 	handleChange(e) {
// 		this.setState({ [e.target.name]: e.target.value });
// 	}

// 	render() {
// 		return (
// 			<fieldset>
// 				<legend>Enter temperature in {scaleNames[this.props.scale]}:</legend>
// 				<input value={this.state.temperature} onChange={this.handleChange} name="temperature" />
// 			</fieldset>
// 		);
// 	}
// }

// class Calculator extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<TemperatureInput scale="c" />
// 				<TemperatureInput scale="f" />
// 			</div>
// 		);
// 	}
// }

// ReactDOM.render(<Calculator />, document.getElementById('root'));

//===================================

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function BoilingVerdict(props) {
	return (props.celsius >= 100) ? (<p>The water would boil.</p>) : <p>The water would not boil.</p>
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const { temperature, scale } = this.props
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {
			temperature: '',
			scale: 'c'
		};
	}

	handleCelsiusChange(temperature) {
		this.setState({
			scale: 'c',
			temperature
		});
	}

	handleFahrenheitChange(temperature) {
		this.setState({
			scale: 'f',
			temperature
		});
	}

	render() {
		const { scale, temperature } = this.state
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
