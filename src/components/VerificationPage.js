import { Component } from "react";

class Verification extends Component {


  verifyUser(token) {
    fetch("http://localhost:8080/users/confirm?token=" + token)
    .then(res => res.text())
    .then(res => {
        this.setState({apiResponse: res})
        console.log(this.state.apiResponse);
    })
    .catch(err => err);
  }

  componentDidMount() {
    console.log(this.props.match.params.token);
    this.verifyUser(this.props.match.params.token);
  }

  render() {
    return (
        <div>
            <h1>
              {this.props.match.params.token}
            </h1>
        </div>
    )
}
}

export default Verification;