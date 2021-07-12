import React, {Component} from 'react';
import './App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import getRoadData from './utils/dataUtils';
const API_KEY = process.env.REACT_APP_MAP_KEY;

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 47.6062,
  lng: -122.3321
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = { roadData : null }
  }

  async componentDidMount(){
    const roadData = await getRoadData();
    this.setState({ roadData });
  }

  render() {
    
    return(
      <div className="App">
        <LoadScript
                googleMapsApiKey={API_KEY}
              >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
          >
          {
            this.state.roadData &&
            this.state.roadData.map((local, index) => {
              console.log('local: ', local);
              return(                
                <div key={index}>
                  <Marker
                    position={{
                      lat: local.stationlocation.coordinates[1],
                      lng: local.stationlocation.coordinates[0]
                    }}
                  />
                </div>
              )
            })            
          }
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

export default App;
