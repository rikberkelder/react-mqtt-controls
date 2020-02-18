import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import Slider from './BaseSlider';
import {hsv, hex} from 'color-convert';

interface ColorProps {
    height?: number;
    onChange?: any;
    value?: string;
    brightness?: boolean;
}

const ColorSlider: React.FC<ColorProps> = (props) => {
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [value, setValue] = useState(100);
    const [hexValue, setHexValue] = useState(hsv.hex([hue, saturation, 100]))

    useEffect(()=>{
	if(props.value){
	    const [inputHue, inputSaturation, inputValue] = hex.hsv(props.value);
	    if(props.value !== hexValue){
		setHue(inputHue);
		setSaturation(inputSaturation);
		if(props.brightness){
		    setValue(inputValue);
		} 
		calculateHex(inputHue, inputSaturation, inputValue);
	    }
	}
    }, [props.value])

    const hueStyleOverride = {
	'& .MuiSlider-track': {
	    opacity: 0
	},
	'& .MuiSlider-rail': {
	    opacity: 100,
	    background: 'linear-gradient(left, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
	}
    }

    const whiteStyleOverride = {
	'& .MuiSlider-track': {
	    opacity: 0
	},
	'& .MuiSlider-rail': {
	    background: `linear-gradient(left, #FFF 0%, hsl(${hue}, 100%, 50%) 100%)`,
	    opacity: 100
	}
    }

    const valueStyleOverride = {
	'& .MuiSlider-track': {
	    opacity: 0,
	},
	'& .MuiSlider-rail': {
	    opacity: 100,
	    background: `linear-gradient(left, #000 0%, hsl(${hue}, 100%, ${100 - (saturation / 2)}%) 100%)`
	}
    }

    const handleHue = (event: any, eventValue: any ) => {
	setHue(eventValue as number);
	calculateHex(eventValue as number, saturation, value);
    }

    const handleSaturation = (event: any, eventValue: any) =>{
	setSaturation(eventValue as number);
	calculateHex(hue, eventValue as number, value);
    }

    const handleValue = (event: any, eventValue: any) => {
	setValue(eventValue as number);
	calculateHex(hue, saturation, eventValue);
    }

    const calculateHex = (hue: number, saturation: number, value: number) => {
	const hexVal = hsv.hex([hue, saturation, value]);
	setHexValue(hexVal);
	if(props.onChange){
	    props.onChange(null, hexVal);
	}
    }

    return (
	<Grid container spacing={2} className="ColorSlider">
	    <Grid item xs={12} md={1} style={{marginBottom: 0, paddingBottom:0 }}>
		<Paper style={{backgroundColor: `#${hexValue}`, height: '95%', width: '100%', minHeight: (props.height || 36.5),  transition: 'all 0.1s linear'}}>
		</Paper>
	    </Grid>
	    <Grid item xs={12} md={11}>
		<Slider min={0} max={359} styleOverride={hueStyleOverride} onChange={handleHue} height={props.height} value={hue}></Slider>
		<Slider min={0} max={100} styleOverride={whiteStyleOverride} onChange={handleSaturation} height={props.height} value={saturation}></Slider>
		{props.brightness ? <Slider min={0} max={100} styleOverride={valueStyleOverride} onChange={handleValue} height={props.height} value={value}></Slider> : null}
	    </Grid>
	</Grid>
    )
    
}

export default ColorSlider;
