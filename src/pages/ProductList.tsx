import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import { Spinner } from '@blueprintjs/core';

import { useFetch } from 'utils';
import { Product } from 'types/product.interface';
import { FunctionBar, ProductCard } from 'components/productList';


const PageLayout = styled.div`
	display: grid;
	grid-template-areas: "main" "header";
	grid-template-rows: calc(100vh - 60px - 133px) auto;
	gap: 1.25rem;
	width: 100%;
	padding: 1.25rem;
	@media (min-width: 960px) {
		grid-template-areas: "header" "main";
		grid-template-rows: auto calc(100vh - 60px - 133px);
	}
`

const StyledHeader = styled.header`
	grid-area: header;
	padding: 0 2rem;
`

const ProductsLayout = styled.main`
	grid-area: main;
  display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-auto-rows: min-content;
	gap: 1.25rem;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	padding: 1.25rem;
	@media (min-width: 420px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 600px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}
	@media (min-width: 960px) {
		grid-template-columns: repeat(4, 1fr);
	}
`

const ProductCards = (products: Product[], filterMode: string, sortMode: string) => (
	products
		.filter(product => filterMode === 'all' || product.sizes.includes(filterMode))
		.sort((productA, productB) => sortMode === 'ASC' ? (productA.priceR ?? productA.priceO) - (productB.priceR ?? productB.priceO) : (productB.priceR ?? productB.priceO) - (productA.priceR ?? productA.priceO))
		.map(product => <ProductCard product={product} filter={filterMode} />)// FIXME: if filter selects a size that doesn't change the product list, then the size selection isn't preselected accordingly
)

// @ts-ignore // FIXME: fix typescript error (set spread into array)
const getAllSizes = (products: Product[]): string[] => [...new Set(products.map(product => product.sizes.filter(size => size !== '00'/* XXX: '00' is not a valid sice */)).flat())]

const ProductList: React.FunctionComponent = () => {
	const { loading, data } = useFetch('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json');
	const [sortMode, setSortMode] = useState('ASC');
	const [filterMode, setFilterMode] = useState('all');

	if (loading) {// @ts-ignore // FIXME: fix typescript error (set spread into array)
		return <Spinner css={css`height: 100%`} size={200} />
	} else {
		return (
			<PageLayout>
				<StyledHeader>
					<FunctionBar
						sizes={getAllSizes(data!)}
						sortCallback={setSortMode}
						filterCallback={setFilterMode}
					/>
				</StyledHeader>
				<ProductsLayout>
					{ProductCards(data!, filterMode, sortMode)}
				</ProductsLayout>
			</PageLayout>
		);
	}
}

export default ProductList;