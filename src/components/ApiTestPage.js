import { Component } from "react";

class ApiTestPage extends Component{
    constructor(props){
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI(){
        fetch("http://localhost:3001/testAPI")
        .then(res => res.text())
        .then(res => {
            this.setState({apiResponse: res})
            console.log(this.state.apiResponse);
        })
        .catch(err => err);
    }

    componentDidMount(){
        this.callAPI();
    }

    render(){
        return(
            <div>
                <h1>
                    Test of Express with React: API calls
                </h1>
                <p>{this.state.apiResponse}</p>
            </div>
        )
    }
}

export default ApiTestPage;