//Import Here !!
import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/Imagerecogition";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Facerecoginition from "./components/FaceRecoginition/Facerecoginition";
import SignForm from "./components/signForm";
import Register from "./components/Register/Register";

//for resloving process.nextTick error we are setting it imeediately
process.nectTick = setImmediate;
//getting the api key provided by the CLarifai.
const app = new Clarifai.App({
  apiKey: "437c9a1e3cdf4069a9622696ffe15ed6",
});

//Main body of app and the things we will render in our app.

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signForm",
      signedIn: false,
    };
  }

  //Any change in the input feild will get detetcted
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //calculating the face parameter to give detection effect

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  //displaying the container
  displayFaceBox = (box) => {
    this.setState({ box });
  };

  //for detecting the face once we click detect button
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      ) // do something with response
      .catch((err) => console.log(err));
  };

  //onRouteChnage function
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ signedIn: false });
    } else if (route === "home") {
      this.setState({ signedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { signedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: 180,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
            },
          }}
        />
        <Navigation signedIn={signedIn} onRouteChnage={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <Facerecoginition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signForm" ? (
          <SignForm onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
