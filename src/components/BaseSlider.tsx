import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { merge } from 'lodash';
import React, { useEffect, useState } from 'react';

interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    styleOverride?: any; 
    onChange?: any;
    height?: number;
    value?: number;
}

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

const RBSlider: React.FC<SliderProps> = (props) => {
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
		if(parsedPropsValue || typeof props.value === 'number'){
			setValue(parsedPropsValue)
		}
	}, [parsedPropsValue])

	const styles = useStyles({height: props.height, styleOverride: props.styleOverride})

	return (
		<Slider min={props.min} max={props.max} value={value as number} onChange={onChange} onChangeCommitted={onRelease} className={styles.root}> </Slider>
	)
}

export default RBSlider;
