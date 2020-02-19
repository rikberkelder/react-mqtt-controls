import MUISlider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { merge } from 'lodash';
import React, { useEffect, useState } from 'react';

interface SliderProps {
    /**
     * The minimum output value
     */

    min?: number;

    /**
     * The maximum output value
     */

    max?: number;

    /**
     * The increment at which the slider moves
     */

    step?: number;

    /**
     * Adds this to the input of makeStyles
     */

    styleOverride?: any; 

    /**
     * Called when slider gets moved.
     */

    onChange(event: any, value: number): void;

    /**
     * Height in px
     */

    height?: number;

    /**
     * The input value of the component
     */

    value?: number;
}

/**
 *  Generate the styling for the component
 */

const useStyles = makeStyles({
    root: (props: any) => (merge({
	height: props.height || 36.5,
	paddingTop: 0,
	paddingBottom: 0,
	width: `calc(100% - ${props.height || 36.5}px)`,
	'& .MuiSlider-rail': {
	    height: props.height || 36.5,
	    borderRadius: 4,
	    paddingRight: props.height || 36.5
	},
	'& .MuiSlider-track': {
	    height: props.height || 36.5,
	    borderRadius: 4,
	    paddingRight: props.height || 36.5,
	    marginLeft: 0
	},
	'& .MuiSlider-thumb': {
	    height: props.height || 36.5,
	    width: props.height || 36.5,
	    borderRadius: 4,
	    marginTop: 0,
	    marginLeft: 0,
	    color: 'white',
	}
    }, props.styleOverride))
})

/**
 * A slider input. Can be used to set the value between a minimum and a maximum.
 *
 * ```<Slider onChange={(event, value)=>{console.log(value)}} />```
 */

export const Slider: React.FC<SliderProps> = (props) => {
	let parsedPropsValue = 0;
	if(props.value || typeof props.value === 'number'){
		parsedPropsValue = typeof props.value === 'number' ? props.value : parseInt(props.value, 10)
	}

	const [value, setValue] = useState(parsedPropsValue);

	const onChange = (event: any, value: any) =>{
		setValue(value as number)
	}

	const onRelease = (event: any, eventValue: any) => {
		if(props.onChange) props.onChange(event, value);
	}

	useEffect(()=>{
	    console.log(parsedPropsValue);
		if(typeof parsedPropsValue === 'number' || typeof props.value === 'number'){
			setValue(parsedPropsValue)
		}
	}, [parsedPropsValue])

	const styles = useStyles({height: props.height, styleOverride: props.styleOverride})

	return (
		<MUISlider min={props.min} max={props.max} value={value as number} onChange={onChange} onChangeCommitted={onRelease} className={styles.root}/>
	)
}
