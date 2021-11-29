import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="mainScreen">
        <header className="App-header">
          <img src="./resources/Picture14.png" alt="logo" />
          <p>
            <Link to="/testAPI">
              <button type="button"> Express Test</button>
            </Link>  
            <Link to="/projects">
              <button type="button"> Projects</button>
            </Link>
            <Link to="/register">
              <button type="button"> Register</button>
            </Link>           
          </p>
        </header>
      </div>
    )
}

export default Home;