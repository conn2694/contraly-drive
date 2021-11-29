import { Component } from "react";

class RegisterPage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            email: ""
          };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }

    getCurrentUsers(){
        fetch("http://localhost:3001/users")
        .then(res => res.text())
        .then(res => {
            this.setState({apiResponse: res})
            console.log(this.state.apiResponse);
        })
        .catch(err => err);
    }

    componentDidMount(){
        console.log('page loaded');
    }

    handleSubmit(event) {
        console.log(this.state);
        this.postData('http://localhost:8080/users/', this.state)
        .then(data => {console.log(data)})
    }

    // Example POST method implementation:
    async postData(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }




    testInput(regex, value, failureMessage) {
        const pattern = new RegExp(regex);
        if (!pattern.test(value)) {
            console.log(failureMessage);
            return false;
        }
        else { return true; }
    }
    // Returns the state of the submit button, false means we can click it, true means we can't
    submitTest() {
        // If all of our inputs are valid enable the submit button
        // Otherwise disable it
        if (this.testInput(/^\S*$/, this.state.username, 'Username must not have spaces') &&
            this.testInput(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, this.state.password, 'Password must have at least 1 upper case letter, 1 lower case letter, 1 symbol (!@#$&*), and be 8 characters long') &&
            this.testInput(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, this.state.email, 'Please enter valid email address.')
        ) {
            return false;
        }
        else {
            return true;
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // These just display messages
        if (name === 'name') {
            console.log('changing name');
        }
        else if (name === 'username') {
            // Do checking to make sure that user isn't already in database
            const pattern = new RegExp(/^\S*$/);
            if (!pattern.test(value)) {
                console.log('Username must not have spaces');
            }
            console.log('changing username');
        }
        else if (name === 'password') {
            const pattern = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/);
            if (!pattern.test(value)) {
                console.log('Password must have at least 1 upper case letter, 1 lower case letter, 1 symbol (!@#$&*), and be 8 characters long');
            }
            console.log('changing password');
        }
        else if (name === 'email') {
            // Must have email format
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(value)) {
                console.log('Please enter valid email address.');
            }
            console.log('changing email');
        }
    
        this.setState({
          [name]: value
        });

        this.submitTest()
      }

    render(){
        return(
            <div>
                <h1>
                    Register for a new account
                </h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Username: 
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Password: 
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Email: 
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" disabled={this.submitTest()}/>
                 </form>
            </div>
        )
    }
}

export default RegisterPage;