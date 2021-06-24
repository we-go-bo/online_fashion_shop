import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled'
import { AnchorButton } from '@blueprintjs/core';


const StyledNav = styled.nav`
	width: 100%;
	margin: 0;
	padding: 1.25rem;
`

const StyledUl = styled.ul`
	display: flex;
	justify-content: center;
	gap: .5rem;
	margin: 0;
	padding: 0;
	li {
		flex-grow: 1;
		list-style: none;
	}
	@media (min-width: 960px) {
		gap: 1.25rem;
		li {
			flex-grow: 0;
		}
	}
`

const Header: React.FunctionComponent = () => {
	const history = useHistory()

	return (// TODO: remake but use navbar component from Blueprint|https://blueprintjs.com/docs/#core/components/navbar
		<header>
				<StyledNav>
					<StyledUl>
						<li>
							<AnchorButton minimal fill large onClick={() => history.push('/')}>Hinweis</AnchorButton>
						</li>
						<li>
							<AnchorButton minimal fill large onClick={() => history.push('/productList')}>Produktliste</AnchorButton>
						</li>
						<li>
							<AnchorButton minimal fill large onClick={() => history.push('/statistics')}>Statistik</AnchorButton>
						</li>
					</StyledUl>
				</StyledNav>
		</header>
	)
}

export default Header
