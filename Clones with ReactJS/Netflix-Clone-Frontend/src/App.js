import React from 'react';
import Row from './Row';
import requests from './requests';
import './App.css';
import Banner from './Banner';
import Nav from './Nav';

function App() {
	return (
		<div className="app">
			<Nav />
			<Banner />
			<Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
			<Row title="Trending Now" fetchUrl={requests.fetchTrending} />
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
			<h4>
				{' '}
				Developed by{' '}
				<a href="https://github.com/proghead00" target="_blank">
					Susnata{' '}
				</a>{' '}
			</h4>
		</div>
	);
}

export default App;
