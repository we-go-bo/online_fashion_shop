import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from '@emotion/styled'

import { Header, Main } from "./components/layout";
import { Notice, ProductList, Statistics } from './pages';

const Layout = styled.div`
	display: grid;
	grid-template-areas: "main" "header";
  grid-template-rows: calc(100vh - 80px) auto;
	width: 100%;
	max-width: 64rem;
	min-width: 22rem;
	margin: auto;
	font-size: 11px;
	header {
		grid-area: header;
	}
	main {
		grid-area: main;
	}
	@media (min-width: 960px) {
		grid-template-areas: "header" "main";
		grid-template-rows: auto calc(100vh - 80px);
		padding: 0 1.25rem;
	font-size: 14px;
	}
`

const App: React.FunctionComponent = () => {

	return (// TODO: use context API from React|https://reactjs.org/docs/context.html
		<Router>
			<Layout>
				<Header />
				<Main>
					<Route exact path="/" component={Notice} />
					<Route exact path="/productList" component={ProductList} />
					<Route exact path="/statistics" component={Statistics} />
				</Main>
			</Layout>
		</Router>
	);
}

export default App;