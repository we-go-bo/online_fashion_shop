import { useState, useEffect } from 'react'

import { DATA as FALLBACK_DATA } from 'data'


const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'// TODO: remove and find an API (ASOS|https://rapidapi.com/apidojo/api/asos2/) or make a local JSON file and mock api request

const useFetch = (url: string) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		await fetch(CORS_ANYWHERE + url)
			.then(response => response.json())
			.then(data => setData(data))
			// @ts-ignore// FIXME: fix typescript error 
			.catch(() => setData(FALLBACK_DATA))
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [url]);

	return { loading, data };
};

export default useFetch