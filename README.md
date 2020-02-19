A collection of React components to interact with MQTT.

## Usage
First of all you need to wrap your app in a `MqttConnection` component, after that, you can use the `MqttComponent` component to turn any component with an `onChange(event, value)`prop into an MQTT connected control.

Documentation [here]{https://rikberkelder.github.com/react-mqtt-controls}
### Example
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import {
    MqttConnection,
    MqttComponent,
    Button
} from 'react-mqtt-controls';

const App = () => {
    return (
	<MqttConnection config={{url: 'mqtt://localhost:9001'}}>
	    <MqttComponent
		compoennt={Button}
		topic="/my/mqtt/topic"
		componentProps={{
		    value: "hello"
		}}

		publishOptions={{
		    qos: 0,
		    retain: true
		}}

		noRBE
	    >
		Button Text
	    </MqttComponent>
	</MqttConnection>
    )
}; 

ReactDOM.render(<App />, document.getElementById('app'));
```
