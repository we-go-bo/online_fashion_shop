import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { ResponsiveBar } from '@nivo/bar'
import { Slider } from '@blueprintjs/core';

import { Product } from 'types/product.interface'


const StyledSection = styled.section`
	height: 500px;
	margin-bottom: 40px;
`

interface Format {
	brand: string
	amount: number
}

const Chart1 = ({ data, colors }: { data: Product[], colors: string[] }) => {
	const [threshold, setThreshold] = useState(40);

	const formatData = (products: Product[]) => {
		let formatedData: Array<Format> = []
		products.forEach(product => {
			if (formatedData.find(el => el.brand === product.brand)) {
				(product.priceR ?? product.priceO) < threshold && formatedData.find(el => el.brand === product.brand)!.amount++
			} else {
				if ((product.priceR ?? product.priceO) < threshold) formatedData.push({ brand: product.brand, amount: 1 })
			}
		})
		return formatedData
	}

	const getMinPrice = (): number => Math.min(...data.map(product => product.priceR ?? product.priceO))
	const getMaxPrice = (): number => Math.max(...data.map(product => product.priceR ?? product.priceO))

	return (
		<StyledSection>
			<ResponsiveBar
				data={formatData(data)}
				keys={['amount']}
				indexBy="brand"
				margin={{ top: 0, right: 50, bottom: 50, left: 80 }}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={colors}
				// @ts-ignore // FIXME: fix typescript error (prop undefinde)
				colorBy="indexValue"
				layout="horizontal"
				borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				// @ts-ignore // FIXME: fix typescript error (prop undefinde)
				tooltip={({ value, indexValue }) => <div>{indexValue}: {value}</div>}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: `Menge an Artikel unter ${threshold}€`,
					legendPosition: 'middle',
					legendOffset: 32
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: -45
				}}
				enableGridX
				enableGridY={false}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				animate={true}
			/>
			<Slider
				// @ts-ignore // FIXME: fix typescript error (prop undefinde)
				css={css`width: 80%; margin: auto`}
				min={Math.round(getMinPrice() / 10) * 10}
				max={Math.round(getMaxPrice() / 50) * 50}
				stepSize={10}
				labelRenderer={false}
				labelStepSize={10}
				onChange={value => setThreshold(value)}
				value={threshold}
				showTrackFill
			/>
		</StyledSection>
	)
}

export default Chart1