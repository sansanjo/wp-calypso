/**
 * External dependencies
 */
import '@automattic/calypso-polyfills';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import config from '../../config';

/**
 * Internal dependencies
 */
import { Gutenboard } from './gutenboard';
import { setupWpDataDebug } from './devtools';
import accessibleFocus from 'lib/accessible-focus';
import { path, steps, langs, makePath, Step } from './path';

/**
 * Style dependencies
 */
import 'assets/stylesheets/gutenboarding.scss';
import 'components/environment-badge/style.scss';

window.AppBoot = () => {
	if ( ! config.isEnabled( 'gutenboarding' ) ) {
		window.location.href = '/';
	} else {
		setupWpDataDebug();

		// Add accessible-focus listener.
		accessibleFocus();

		ReactDom.render(
			<BrowserRouter basename="gutenboarding">
				<Switch>
					<Route exact path={ path }>
						<Gutenboard />
					</Route>
					<Route
						exact
						path={ `/:step(${ steps.join( '|' ) })/:garbage?` }
						render={ ( { match } ) => <Redirect to={ makePath( match.params.step ) } /> }
					/>
					<Route
						exact
						path={ `/:garbage?/:lang(${ langs.join( '|' ) })?` }
						render={ ( { match } ) => (
							<Redirect to={ makePath( Step.IntentGathering, match.params.lang ) } />
						) }
					/>
					<Route>
						<Redirect to="/" />
					</Route>
				</Switch>
			</BrowserRouter>,
			document.getElementById( 'wpcom' )
		);
	}
};
