/**
 * External dependencies
 */
import { generatePath, useParams } from 'react-router-dom';
import { getLanguageSlugs } from '../../lib/i18n-utils';
import { ValuesType } from 'utility-types';

export const Step = {
	IntentGathering: 'about',
	DesignSelection: 'design',
	PageSelection: 'pages',
	Signup: 'signup',
	CreateSite: 'create-site',
} as const;

const langs: string[] = getLanguageSlugs();
const steps = Object.keys( Step ).map( key => Step[ key as keyof typeof Step ] );

export const path = `/:step(${ steps.join( '|' ) })?/:lang(${ langs.join( '|' ) })?`;

export function makePath( step: ValuesType< typeof steps >, lang?: string ) {
	return generatePath( path, {
		step,
		...( lang && langs.includes( lang ) && { lang } ),
	} );
}

export function usePath( step: ValuesType< typeof steps >, lang?: string ) {
	const params = useParams();
	lang = lang || params.lang;
	return generatePath( path, {
		step,
		...( lang && langs.includes( lang ) && { lang } ),
	} );
}
