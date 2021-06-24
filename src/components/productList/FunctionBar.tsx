import React from 'react';
import styled from '@emotion/styled'
import { Label, HTMLSelect, ControlGroup } from '@blueprintjs/core';


const StyledLabel = styled(Label)`
	margin-bottom: 0!important;
	z-index: 10;
`

interface Props {
	sizes: string[]
	sortCallback(sortMode: string): void
	filterCallback(filterMode: string): void
}

const FunctionBar: React.FunctionComponent<Props> = ({ sizes, sortCallback, filterCallback }) => {
	return (// TODO: make more nice
		<ControlGroup fill={true} vertical={false}>
			<StyledLabel>
				Größe Filtern:
				<HTMLSelect defaultValue="all" onChange={e => filterCallback(e.target.value)}>
					<option value="all">Alle Größen</option>
					{sizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
				</HTMLSelect>
			</StyledLabel>
			<StyledLabel>
				Preis Sortieren:
				<HTMLSelect onChange={e => sortCallback(e.target.value)}>
					<option value="ASC">Aufsteigend</option>
					<option value="DSC">Absteigend</option>
				</HTMLSelect>
			</StyledLabel>
		</ControlGroup>
	);
}

export default FunctionBar;