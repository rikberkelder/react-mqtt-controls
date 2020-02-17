import { IClientPublishOptions } from 'async-mqtt';
import React, { useContext, useEffect, useState } from 'react';
import { IMqttContext, MqttContext } from '../MqttContext';
import { usePrevious } from './usePrevious';

interface MqttSubComponent {
    value: number | string;
    onChange(event: any, value: number | string): void
}

interface MqttComponentProps {
    component: React.FC<MqttSubComponent & any>;
    topic: any;
    componentProps?: any;
    publishOptions?: IClientPublishOptions;
    noRBE?: boolean;
    children?: any;
}



const MqttComponent: React.FC<MqttComponentProps> = (props: MqttComponentProps)=>{
    const mqtt: IMqttContext = useContext(MqttContext);
    const [timesCalled, setTimesCalled] = useState<number>(0);
    const [value, setValue] = useState<any>(null);
    const [remoteValue, setRemoteValue] = useState<string>('');
    const onChange = (event: any, value: number | string) => {
	setValue(value);
	setTimesCalled(timesCalled + 1);
    }

    const lastValue = usePrevious(value);

    const handleMqtt = (topic: any, message: any) =>{
	setRemoteValue(message.toString());
	if(topic == props.topic){
	    if(value || typeof value == 'number'){
		if(message.toString() !== value.toString()){
		    setValue(message.toString());
		}
	    } else {
		setValue(message.toString())
	    }   
	}
	   
}

    useEffect(()=>{
	if(mqtt.client && (value || typeof value == 'number')){
	    if((props.noRBE || value != lastValue) && value != remoteValue){
		mqtt.client.publish(props.topic, value.toString(), props.publishOptions || {qos: 0})
	    }	
	}
    }, [mqtt, value, timesCalled])


    useEffect(()=>{
	if(mqtt.client){
	    mqtt.client.subscribe(props.topic)
	    mqtt.client.on('message', handleMqtt);

	}

	return function cleanup(){
	    if(mqtt.client){
		mqtt.client.removeListener('message', handleMqtt);
	    }
	}

    }, [mqtt, setValue, setRemoteValue])

    return (<div>
	<props.component onChange={onChange} value={value} {...props.componentProps}>{props.children}</props.component>
    </div>)
}

export default MqttComponent;
