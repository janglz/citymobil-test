import { Context } from './state/context'
import './App.css';
import { SearchBar } from './components/SearchBar'
import { Table } from './components/Table'
import InfoBar from './components/InfoBar'
import React from 'react';
import State from './state/initialState';



function App() {
	const state = new State()

	return (
		<Context.Provider value={state}>
			<div className="App">
				<header className="app-header"><h1>header</h1></header>
				<div className="flex-container">
				<aside className="app-sidebar"><h1>sidebar</h1></aside>
				<Context.Consumer>{() => (
					<main className="app-main">
						<SearchBar />
						<Table />
						<InfoBar />
					</main>
				)}</Context.Consumer>
				</div>
				<footer className="app-footer"><h1>footer</h1></footer>
			</div>
		</Context.Provider>
	);
}

export default App;
