import styled from '@emotion/styled'
import { ResponsiveBar } from '@nivo/bar'

import { Product } from 'types/product.interface'


const StyledSection = styled.section`
	height: 500px;
`

interface Format {
	brand: string
	avergaePrice: number
}

const Chart3 = ({ data, colors }: { data: Product[], colors: string[] }) => {
	const SIZE = '32'

	const formatData = (products: Product[]) => {
		let formatedData: Array<Format> = []
		let tmp: any[] = []
		products.forEach(product => {
			if (product.sizes.includes(SIZE)) {
				if (tmp.find(el => el.brand === product.brand)) {
					tmp.find(el => el.brand === product.brand).prices.push((product.priceR ?? product.priceO))
				} else {
					tmp.push({ brand: product.brand, prices: [(product.priceR ?? product.priceO)] })
				}
				formatedData = tmp.map(el => ({ brand: el.brand, avergaePrice: el.prices.reduce((a: number, b: number) => a + b) / el.prices.length }))
			}
		})
		return formatedData
	}

	return (
		<StyledSection>
			<ResponsiveBar
				data={formatData(data)}
				keys={['avergaePrice']}
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
				tooltip={({ value, indexValue }) => <div>{indexValue}: Ø {value}€</div>}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: `Durchschnittspreis des Sortiments in der Größe von „${SIZE}”`,
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
				label={({value}) => `Ø ${value}€`}
				labelTextColor={{ from: 'color', modifiers: [['darker', 2.8]] }}
				animate={true}
			/>
		</StyledSection>
	)
}

export default Chart3