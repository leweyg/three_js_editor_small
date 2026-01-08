import { UIPanel, UIBreak, UIText } from './libs/ui.js';

function ViewportInfo( editor ) {

	const signals = editor.signals;
	const strings = editor.strings;

	const container = new UIPanel();
	container.setId( 'info' );
	container.setPosition( 'absolute' );
	container.setLeft( '10px' );
	container.setBottom( '10px' );
	container.setFontSize( '12px' );
	container.setColor( '#fff' );

	const objectsText = new UIText( '0' ); //.setMarginLeft( '6px' );
	const verticesText = new UIText( '0' ); //.setMarginLeft( '6px' );
	const trianglesText = new UIText( '0' ); //.setMarginLeft( '6px' );
	const frametimeText = new UIText( '0' ).setMarginLeft( '6px' );

	container.add(new UIText("Quadrant Touch Controls:"), new UIBreak() );
	container.add(new UIText("bottom right = look-around"), new UIBreak() );
	container.add(new UIText("bottom left = walk-around"), new UIBreak() );
	container.add(new UIText("top left = fly-up"), new UIBreak() );
	container.add(new UIText("top right = zoom"), new UIBreak() );

	container.add( new UIBreak() );
	//container.add( new UIText( strings.getKey( 'viewport/info/vertices' ) ).setTextTransform( 'lowercase' ) );
	//container.add( verticesText, new UIText("/") );
	//container.add( new UIText( strings.getKey( 'viewport/info/triangles' ) ).setTextTransform( 'lowercase' ) );
	//container.add( trianglesText, new UIBreak() );
	//container.add( new UIText( strings.getKey( 'viewport/info/frametime' ) ).setTextTransform( 'lowercase' ) );
	const wantStats = false;
	if (wantStats) {
		container.add( new UIText( "objs@ms=" ) );
		container.add( objectsText );
		container.add( new UIText( "@" ) );
		container.add( frametimeText );
		container.add( new UIBreak() );
	}
	

	signals.objectAdded.add( update );
	signals.objectRemoved.add( update );
	signals.geometryChanged.add( update );

	//

	function update() {

		const scene = editor.scene;

		let objects = 0, vertices = 0, triangles = 0;

		for ( let i = 0, l = scene.children.length; i < l; i ++ ) {

			const object = scene.children[ i ];

			object.traverseVisible( function ( object ) {

				objects ++;

				if ( object.isMesh || object.isPoints ) {

					const geometry = object.geometry;

					vertices += geometry.attributes.position.count;

					if ( object.isMesh ) {

						if ( geometry.index !== null ) {

							triangles += geometry.index.count / 3;

						} else {

							triangles += geometry.attributes.position.count / 3;

						}

					}

				}

			} );

		}

		objectsText.setValue( objects.format() );
		verticesText.setValue( vertices.format() );
		trianglesText.setValue( triangles.format() );

	}

	signals.sceneRendered.add( updateFrametime );

	function updateFrametime( frametime ) {

		frametimeText.setValue( Number( frametime ).toFixed( 2 ) + ' ms' );

	}

	return container;

}

export { ViewportInfo };
