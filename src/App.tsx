import React, {useState, useContext} from 'react';

import Button from './components/Button';
import Slider from './components/BaseSlider';
import Color from './components/Color';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MqttComponent from './components/MqttComponent';

import {MqttConnection, MqttContext, IMqttContext} from './MqttContext';

const App: React.FC = () => {

    const [value, setValue] = useState(20);
    const [hex, setHex] = useState('FF0000');
    const mqtt: IMqttContext = useContext(MqttContext);

    const onChange = (event: any, value: any)=>{
	console.log(value)
	setValue(value)
    }


    return (
	<MqttConnection config={{url: 'mqtt://192.168.0.200:9001'}}>
	    <div className="App">
		<header className="App-header">
		    <Container>
			<svg viewBox="0 0 172 18">
			    <text x="0" y="15" style={{fill: '#fff'}}></text>
			</svg>
			{mqtt.status}
			<Grid container spacing={3}>
			    <Grid item xs={12}>
				<Typography gutterBottom>
				    Slider
				</Typography>
				<Slider onChange={onChange} value={value} />
			    </Grid>
			    <Grid item xs={12}>
				<Typography gutterBottom>
				    Mqtt Slider
				</Typography>
				<MqttComponent
				    topic="/rik/stelling/brightness"
				    component={Slider}
				    componentProps={{
					min: 0,
					max: 100
				    }}
				    publishOptions={{
					qos: 0,
					retain: true
				    }}
				></MqttComponent>

				<MqttComponent
				    topic="/rik/stelling/colour"
				    component={Color}
				    componentProps={{
					brightness: true,
				    }}
				    publishOptions={{
					qos: 0,
					retain: true
				    }}
				>
				</MqttComponent>
			    </Grid>
			    test
			    <Grid item xs={12}>
				test
				<MqttComponent
				    topic="/rik/mqttbutton/test"
				    noRBE
				    component={Button}
				    componentProps={{
					value: "test"
				    }}
				>
				    test
				</MqttComponent>
			    </Grid>
			</Grid>
		    </Container>
		</header>
	    </div>
	</MqttConnection>
    );
}

export default App;
