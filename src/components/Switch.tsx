import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

interface SwitchProps{
    /**
     * The height of the control in px
     */

    height?: number;

    /**
     * Gets called when toggled
     */

    onChange(event: any, value: string | number): void;

    /**
     * Input value
     */

    value?: any;

    /**
     * Value when toggled off
     * @defaultValue "off"
     */

    lowValue?: any;

    /**
     * Value when toggled on
     * @defaultValue "on"
     */

    highValue?: any;
}

const useStyles = makeStyles({
    root: (props: any) => ({
	cursor: 'pointer',
	height: props.height || 36.5,
	width: props.height * 2 || 36.5 * 2,
	paddingTop: 0,
	paddingBottom: 0,
	backgroundColor: '#3f51b5',
	borderRadius: 4,
	'& .thumb': {
	    height: '100%',
	    transition: 'all 0.1s',
	    width: '50%',
	    borderRadius: 4,
	    backgroundColor: '#fff',
	    position: 'relative',
	    left: props.state ? '50%' : '0%'
	}
    })
})

/**
 * A switch. Toggles when clicked, or when input value matches the `lowValue` or `highValue` props.
 */

export const Switch: React.FC<SwitchProps> = (props) => {

    const [status, setStatus] = useState(false);

    const styles = useStyles({height: props.height, state: status});

    useEffect(()=>{
	if(props.value){
	    if(props.value === props.lowValue){
		setStatus(false);
	    } else if(props.value === props.highValue) {
		setStatus(true);
	    }
	}
    }, [props.value])

    const onClick = ()=>{
	const newStatus = !status;
	setStatus(newStatus);

	if(props.onChange){
	    if(newStatus){
		props.onChange(null, props.highValue || 'on');
	    } else {
		props.onChange(null, props.lowValue || 'off');
	    }
	}
    }

    return (
	<div className={styles.root} onClick={onClick}>
	    <div className="thumb"></div>
	</div>
    );
}
