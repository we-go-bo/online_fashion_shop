import styled from '@emotion/styled'
import { ResponsiveBar } from '@nivo/bar'

import { Product } from 'types/product.interface'


const StyledSection = styled.section`
	height: 500px;
`

interface Format {
	brand: string
	amount: number
}

const Chart2 = ({ data, colors }: { data: Product[], colors: string[] }) => {

	const formatData = (products: Product[]) => {
		let formatedData: Array<Format> = []
		let tmp: any[] = []
		products.forEach(product => {
			if (tmp.find(el => el.brand === product.brand)) {
				tmp.find(el => el.brand === product.brand).sizes.push(...product.sizes)
			} else {
				tmp.push({brand: product.brand, sizes: [...product.sizes]})
			}
			// @ts-ignore // FIXME: fix typescript error (set spread into array)
			formatedData = tmp.map(el =>  ({brand: el.brand, amount: [...new Set(el.sizes)].length}))
		})
		return formatedData
	}

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
					legend: 'Menge an erhältlichen verschiedenen Größen',
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
		</StyledSection>
	)
}

export default Chart2