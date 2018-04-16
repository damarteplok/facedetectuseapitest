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
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFace = data.outputs[0].data.regions;
    console.log(clarifaiFace);
    var clarifaiFace1=[];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    for (var i=0, len = clarifaiFace.length; i < len; i++) {
      clarifaiFace1[i] = {
        leftCol: clarifaiFace[i].region_info.bounding_box.left_col * width,
        topRow: clarifaiFace[i].region_info.bounding_box.top_row * height,
        rightCol: width - (clarifaiFace[i].region_info.bounding_box.right_col * width),
        bottomRow: height - (clarifaiFace[i].region_info.bounding_box.bottom_row * height)
      }
    }
    
    return clarifaiFace1;
    
    
    
  }

  displayFaceBox = (box) => {
    
    this.setState({box: box});
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
      
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles' 
              params={particlesOptions}
            />
        <Navigation />
        <div className='flex flex-column'>
        <div className='ma4 mt0 flex-m flex-l justify-center-m justify-center-l'>
          <Logo />
          {/* <Rank /> */}
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        </div>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>

        <Footer />
        </div>
        
      </div>
    );
  }
}

export default App;
