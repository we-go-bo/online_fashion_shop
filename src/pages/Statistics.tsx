
import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { Spinner, Tab, Tabs } from '@blueprintjs/core';

import { Chart1, Chart2, Chart3 } from 'components/statistics'
import { useFetch } from 'utils';
import { Product } from 'types/product.interface';

const PageLayout = styled.div`// TODO: make own component?
	padding: 1.25rem;
	@media (min-width: 960px) {
	}
`
const PREDEFINED_COLOR_PALETTE = [// TODO: extract to color-palette file
	'hsl(39,100%,50%)',
	'hsl(18,100%,63%)',
	'hsl(355,93%,67%)',
	'hsl(335,61%,57%)',
	'hsl(308,33%,53%)',
	'hsl(260,28%,49%)',
	'hsl(218,45%,46%)',
	'hsl(198.9, 100%, 30%)',
]

export const Statistics = (): JSX.Element => {
	const { loading, data } = useFetch('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json');
	const [activeTab, setActiveTab] = useState('chart1');

	const generatePastelColorPalette = (amount: number = 10, hueStart: number = 0, hueEnd: number = 360): string[] => {// TODO: extract to color-palette file
		let colors = []
		for (let i = 0; i < amount; i++) {
			colors.push(`hsl(${hueStart + ((hueEnd - hueStart) / amount * i)}, 80%, 60%)`);
		}
		return colors
	}

	// @ts-ignore // FIXME: fix typescript error (set spread into array)
	const getBrands = (products: Product[]): string[] => [...new Set(products.map(product => product.brand))]

	if (loading) {// @ts-ignore // FIXME: fix typescript error (css prop)
		return <Spinner css={css`height: 100%`} size={200} />
	} else {
	return (
		<PageLayout>
			<Tabs id="TabsExample" onChange={event => setActiveTab(event.toString())} selectedTabId={activeTab}>
				<Tab id="chart1" title="Aufgabe 1" panel={<Chart1 data={data!} colors={PREDEFINED_COLOR_PALETTE} />} />
				<Tab id="chart2" title="Aufgabe 2" panel={<Chart2 data={data!} colors={generatePastelColorPalette(getBrands(data!).length, 180, 400)} />} panelClassName="ember-panel" />
				<Tab id="chart3" title="Aufgabe 3" panel={<Chart3 data={data!} colors={generatePastelColorPalette(5, -150, 20)} />} />
			</Tabs>
		</PageLayout>
	);
	}
}

export default Statistics