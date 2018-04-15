import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Footer from './Components/Footer/Footer';
import Particles from 'react-particles-js';



const app = new Clarifai.App({
  apiKey: 'e92f2695fa8743cc92eaf78e1fd526b8'
 });

const particlesOptions = {
  particles: {
    
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles' 
              params={particlesOptions}
            />
        <Navigation />
        <div className='ma4 mt0 flex-m flex-l justify-center-m justify-center-l'>
          <Logo />
          {/* <Rank /> */}
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        </div>
        <FaceRecognition imageUrl={this.state.imageUrl}/>

        <Footer />
        
      </div>
    );
  }
}

export default App;
