import React, {useState} from 'react';

import Switch from '@material-ui/core/Switch';
import {withStyles} from '@material-ui/core/styles';

interface SwitchProps{
    height?: number;
}

const RBSwitch: React.FC<SwitchProps> = (props) => {


    return (
	<Switch />
    ) 
}

export default RBSwitch;
