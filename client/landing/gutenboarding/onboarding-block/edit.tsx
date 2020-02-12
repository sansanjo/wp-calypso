/**
 * External dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import React, { FunctionComponent } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '../stores/onboard';
import DesignSelector from './design-selector';
import SignupForm from './signup-form';
import CreateSite from './create-site';
import { Attributes } from './types';
import { Step, usePath } from '../path';
import './style.scss';
import VerticalBackground from './vertical-background';
import AcquireIntent from './acquire-intent';

const OnboardingEdit: FunctionComponent< BlockEditProps< Attributes > > = () => {
	const { siteVertical, selectedDesign, isCreatingSite } = useSelect( select =>
		select( STORE_KEY ).getState()
	);

	const intentGatheringPath = usePath( Step.IntentGathering );
	const designSelectionPath = usePath( Step.DesignSelection );
	const pageSelectionPath = usePath( Step.PageSelection );
	const signupPath = usePath( Step.Signup );
	const createSitePath = usePath( Step.CreateSite );

	return (
		<>
			<VerticalBackground />
			<Switch>
				<Route path={ intentGatheringPath }>
					<AcquireIntent />
				</Route>

				<Route path={ designSelectionPath }>
					{ ! siteVertical ? <Redirect to={ intentGatheringPath } /> : <DesignSelector /> }
				</Route>

				<Route path={ pageSelectionPath }>
					{ ! selectedDesign ? (
						<Redirect to={ designSelectionPath } />
					) : (
						<DesignSelector showPageSelector />
					) }
				</Route>

				<Route path={ signupPath }>
					<SignupForm />;
				</Route>

				<Route path={ createSitePath }>
					{ ! isCreatingSite ? <Redirect to={ intentGatheringPath } /> : <CreateSite /> }
				</Route>
				<Route>
					<Redirect to={ intentGatheringPath } />;
				</Route>
			</Switch>
		</>
	);
};

export default OnboardingEdit;
