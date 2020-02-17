import Button from '@material-ui/core/Button';
import React from 'react';

interface ButtonProps {
    value: string | number;
    onChange?: Function;
    children: any;
}

const RBButton: React.FC<ButtonProps> = (props) => {
    const onClick = ()=>{
	if(props.onChange && props.value){
	    props.onChange(undefined, props.value);
	}
    }

    return <Button
	       variant="contained"
	style={{width: "100%"}}
	       onClick={onClick}
	   >{props.children}</Button>;
}

export default RBButton;
