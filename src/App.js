  import './App.css';
  import {Component} from 'react';
  import ParticlesBg from 'particles-bg'
  import Navigation from './components/Navigation/Navigation';
  import FaceRecognition from './components/FaceRecognition/FaceRecognition';
  import Logo from './components/Logo/Logo';
  import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
  import Rank from './components/Rank/Rank'
  import SignIn from './components/SignIn/SignIn';
  import Register from './components/Register/Register';
  import 'tachyons';

  

  const initialState = {
    input: '',
    imageURL: '',
    boxes: {}, // Initialize the 'box' property as an empty object
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  };


  class App extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    loadUser = (data) => {
      this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      });
    }
    


    calculateFaceLocations = (data) => {
      const clarifaiFaces = data.outputs[0].data.regions;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      
      return clarifaiFaces.map((region) => {
        const clarifaiFace = region.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height
        };
      });
    }
    
    

    displayFaceBoxes = (boxes) => {
      console.log(boxes);
      this.setState({ boxes: boxes });
    }
    

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({ imageURL: this.state.input });
      fetch('https://face-map-api.onrender.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: this.state.input}) // Ensure this is correct
      })
      .then(response => response.json())
      .then(response => {
          if (response) {
            fetch('https://face-map-api.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id}) // Ensure this is correct
        })
        .then(response => response.json())
        .then(data => {
          if (data.entries) {
            this.setState(Object.assign(this.state.user, { entries: data.entries }));
          }
        })
        .catch(console.log);

          }
          this.displayFaceBoxes(this.calculateFaceLocations(response));
        })
        .catch(err => console.log(err));
    }
    
    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState( initialState);
      } else if (route === 'home') {
        this.setState({ isSignedIn: true, route: route });
      } else {
        this.setState({ route: route });
      }
    }
    

    render() {
      const {imageURL, route, boxes} = this.state;
      return (
      <div className="App">
        <ParticlesBg  color={'FFFFFF'} num={100} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />

        { route === 'home' 
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />

              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes = {boxes} imageURL = {imageURL}/> 
            </div>
          : (this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }

      </div>
      );
    
  }

  }

  export default App;
