import React, { Component } from 'react';

import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Footer from './Components/Footer/Footer';

import Particles from 'react-particles-js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';





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

const initialState = {
  input: '',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
    }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFace = data.outputs[0].data.regions;
    
    let clarifaiFace1=[];
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
    
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
      
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
      <Particles className='particles' 
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
        ? <div> 
          <div className='flex flex-column'>
            <div className='ma4 mt0 flex-m flex-l justify-center-m justify-center-l'>
              <Logo />
              <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
              </div>
            </div>
            <FaceRecognition box={box} imageUrl={imageUrl}/>

            <Footer />
      
            </div>
          </div>
        
        
        :(
          route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : (
            route === 'signout' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
           

        )

        }
      </div>
    );
  }
}

export default App;
