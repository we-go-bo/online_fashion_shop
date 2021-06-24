import React from 'react';
import styled from '@emotion/styled'
import { Card, Text, HTMLSelect, Elevation } from '@blueprintjs/core';

import { Product } from 'types/product.interface';


const StyledCard = styled(Card)`
	display: grid;
`

const Carousel = styled.div`
	position: relative;
	z-index: 1;
`

const StyledFigure = styled.figure`
	display: block;
	margin: 0;
	background-color: hsl(0, 0%, 100%);
	transition: opacity 300ms cubic-bezier(0.4, 0.0, 1, 1);
	&:nth-of-type(1) {
		opacity: 1;
		&:hover {
			opacity: 0;
		}
	}
	&:nth-of-type(1):hover + & {
		opacity: 1;
	}
	&:nth-of-type(2) {
		position: absolute;
		top: 0;
		opacity: 0;
		z-index: -1;
	}
`

const StyledImg = styled.img`
	display: block;
	width: 100%;
	object-fit: cover;
`

const ReducedPrice = styled.b`
margin-left: .5rem;
	color: hsl(0, 100%, 50%);
`

const getPercentageDIff = (a: number, b: number) => {
	return a || b ? Math.round((100 / a * b - 100)) + '%' : null
}

interface Props {
	product: Product
	filter: string
}

const ProductCard: React.FunctionComponent<Props> = ({ product, filter }) => {
	return (// TODO: make more nice // FIXME: last item shadow is cut off in list (margin on Card itself may fix it?)
		<StyledCard key={product.id} elevation={Elevation.ONE}>
			<a href={product.url} target="_blank" rel="noopener noreferrer">
				<Carousel>
					{product.images.map((image, index) => <StyledFigure key={index}><StyledImg src={image} alt={product.description} /></StyledFigure>)}
				</Carousel>
			</a>
			<Text>{product.brand}</Text>
			<Text ellipsize>{product.description}</Text>
			<Text>{
				product.priceR
					? [<s>{product.priceO.toLocaleString('DE-de')}€</s>, <ReducedPrice>{`${getPercentageDIff(product.priceO, product.priceR)} ${product.priceR.toLocaleString('DE-de')}€`}</ReducedPrice>]
					: <b>{product.priceO.toLocaleString('DE-de')}€</b>
			}</Text>
			<HTMLSelect defaultValue={filter}>
				{product.sizes.filter(size => size !== '00'/* XXX: '00' is not a valid sice */).map((size) => <option key={size} value={size}>{size}</option>)}
			</HTMLSelect>
		</StyledCard>
	);
}

export default ProductCard;