import React, {Component} from 'react'
import Clarifai from 'clarifai'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '1b2a8374d0e542a19b88db2f07896876'
})

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super() 
    this.state = {
      input : '',
      imageUrl: '',
      box: {}, // bounding_box를 나타내는 값들
      route: 'signin', // 화면을 보여주기 위해
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box // Clarifai.FACE_DETECT_MODEL을 하면 res값으로 여러가지가 오는데 그중 필요한 bounding_box만 골라낸 것
    const image = document.getElementById('inputimage') // FaceRecognition의 img tag id
    const width = Number(image.width)
    const height = Number(image.height)
    return { // 사각형의 각 꼭지점의 위치
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => { // calculateFaceLocation의 return값이 box이다
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => { // input은 사진 url. event에서 target.value를 뽑아낸다
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => { // button을 누르면 imageUrl이 현재의 input(사진 url)
    this.setState({imageUrl: this.state.input}) // target value로 뽑아낸 url을 imageUrl에 넣는다
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) // button을 누르면 input의 url이 imageUrl에 저장되므로 현재는 this.state.input으로 적어야 함
    .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => { // 사용자가 signin하면 route를 home으로 변경
    if(route === 'signout') {
      this.setState({isSignedIn: false}) // signout하니까 false로 변경
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={{particlesOptions}} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { 
          this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          : ( 
              this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    )
  }
}

export default App;
