import React, {useState, useContext} from 'react';

import Button from './components/Button';
import Slider from './components/BaseSlider';
import Color from './components/Color';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MqttComponent from './components/MqttComponent';

import {MqttConnection, MqttContext, IMqttContext} from './MqttContext';

const App: React.FC = () => {

    const [value, setValue] = useState(20);
    const [hex, setHex] = useState('FF0000');
    const mqtt: IMqttContext = useContext(MqttContext);
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
				<Grid container spacing={3}>
				<Grid item xs={3} sm={1}>
				    test
				</Grid>

				<Grid item xs={9} sm={11}>
				</Grid>
				</Grid>
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
			    <Grid item xs={12} sm={4} md={2}>
				<MqttComponent
				    topic="/rik/stelling/colour"
				    noRBE
				    component={Button}
				    componentProps={{
					value: "#FF3300"
				    }}
				>
				    test
				</MqttComponent>
			    </Grid>
			    <Grid item xs={12} sm={4} md={2}>
				<MqttComponent
				    topic="/rik/stelling/colour"
				    noRBE
				    component={Button}
				    componentProps={{
					value: "#00AAFF"
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
