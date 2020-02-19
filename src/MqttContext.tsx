import { AsyncMqttClient, connect } from 'async-mqtt';
import React, { useEffect, useState } from 'react';

export enum MqttStatus {
	connected = 'connected',
	reconnecting = 'reconnecting',
	disconnected = 'disconnected',
	offline = 'offline'
}

export interface IMqttConfig {
    /**
     * The URL of the MQTT server (Must have websocket support)
     */

    url: string | null;
}

export interface IMqttContext {
    /**
     * The MQTT Client configuration
     */

    config: IMqttConfig;

    /**
     * The status of the MQTT connection
     */

    status: MqttStatus;

    /**
     * The client to be used by components
     */

    client: AsyncMqttClient | null;
}

export interface IMqttProps {
    config: IMqttConfig,
    children: any
}

export const MqttContext = React.createContext<IMqttContext>({
    config: {
	url: null
    },
    status: MqttStatus.offline,
    client: null,
})

export const MqttConsumer = MqttContext.Consumer;

/**
 * The context provider for all MQTT components. This should probably be somewhere at the top of your app. 
 */

export const MqttConnection: React.FC<IMqttProps> = (props: IMqttProps) => {
	const [mqttStatus, setMqttStatus] = useState<MqttStatus>(MqttStatus.offline)
	const [mqttClient, setMqttClient] = useState<AsyncMqttClient | null>(null)

	useEffect(()=>{
		const client = connect(props.config.url);
		setMqttClient(client);
		client.on('connect', ()=>{setMqttStatus(MqttStatus.connected)})
		client.on('disconnect',()=>{setMqttStatus(MqttStatus.disconnected)});
		client.on('offline', ()=>{setMqttStatus(MqttStatus.offline)});
		client.on('reconnect', ()=>{setMqttStatus(MqttStatus.reconnecting);})

		console.debug('Starting MQTT')
		try{
			client.publish("/test/hello", 'Hello, Mqtt!');
		} catch (e){
			console.error(e);
		}
		
		return function cleanup(){
			client.end();
		}
	}, [props.config.url, setMqttClient])

    return (
		<MqttContext.Provider value={{
			config: props.config,
			status: mqttStatus,
			client: mqttClient
		}}>
	{props.children}
    </MqttContext.Provider>
    )
}
