
import { Callout, H4, Checkbox } from '@blueprintjs/core';


const Notice: React.FunctionComponent = () => {
	return (// TODO: remake General overview of this code challenge
		<Callout style={{ height: 'min-content', maxWidth: 815, margin: 'auto', textAlign: 'justify', hyphens: 'auto' }} title="Hinweis">
			Hallo liebe Kolleginnen & Kollegen,<br />
			hiermit möchte ich euch eine kleine Übersicht geben zum Fortschritt der Challenge und meine Gedanken zur dieser mitteilen.<br />
			Wie Sie schon an der Liste unten sehen können, wurde ich leider nicht fertig mit der Challenge nach 3 Arbeitstagen und 4h.<br />
			Nach meinen Qualitätsanforderung wäre dieses auch nicht möglich, deshalb musste ich einige Features cutten, auch wenn mir das Herz bluted dies zu tun :'D<br />
			Ich hoffe Sie schätzen Qualität über Quantität genauso wie ich.<br />
			Jedes Feedback vor allem kunstruktive Kritik zum Queltext ist sehr willkommen!<br />
			<H4>Forschritt</H4>
			<ul style={{paddingLeft: '2em'}} className=".bp3-list">
				<li>
					/productList
					<ul style={{paddingLeft: '2em'}} className=".bp3-list">
						<li>
							<Checkbox checked={true}>Route erstellen</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Fetchen & Rendern von Daten</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Responsive Styling (mobile first)</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Sortierfunktion</Checkbox>
						</li>
					</ul>
				</li>
				<li>
					/statistics
					<ul style={{paddingLeft: '2em'}} className=".bp3-list">
						<li>
							<Checkbox checked={true}>Route erstellen</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Anhand eines Diagramms die Marke mit den meisten Produkten unter 40€ ermitteln</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Anhand eines Diagramms die Marke mit den meisten verschiedenen Größenauswahl ermitteln</Checkbox>
						</li>
						<li>
							<Checkbox checked={true}>Anhand eines Diagramms die Marke mit den niedrigsten Durchschnittspreis ermitteln</Checkbox>
						</li>
					</ul>
				</li>
			</ul>
			P.s.: sollte der fetch nicht funktionieren, dann einfach über diesen <a href="https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json" target="_blank" rel="noopener noreferrer">Link</a> den Proxy nochmal aktivieren (:
		</Callout>
	);
}

export default Notice;