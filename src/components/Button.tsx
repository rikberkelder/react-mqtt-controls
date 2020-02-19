import MUIButton from '@material-ui/core/Button';
import React from 'react';

interface ButtonProps {
    /**
     * The value that gets passed to onChange when the button is clicked
     */

    value: string | number;

    /**
     * Called when button gets clicked
     */

    onChange(event: any, value: string | number): void;
}

/**
 * A clickable button, exported as Button through index.ts
 *
 * ```<Button onChange={(event, value)=>{console.log(value)}} value="hello">```
 */

export const Button: React.FC<ButtonProps> = (props) => {
    const onClick = ()=>{
	if(props.onChange && props.value){
	    props.onChange(undefined, props.value);
	}
    }

    return (<MUIButton
	variant="contained"
	style={{width: "100%"}}
	onClick={onClick}
	>{props.children}</MUIButton>);
}
