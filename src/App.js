import './App.css';
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from './components/HomePage';
import ApiTestPage from './components/ApiTestPage';
import ProjectPage from './components/ProjectsPage';
import RegisterPage from './components/RegisterPage';
import SingleProjectPage from './components/SingleProjectPage';
import VerificationPage from './components/VerificationPage';

const App = (props) => {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/testAPI" component={ApiTestPage} />
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/projects" component={ProjectPage} />
          <Route exact path="/projects/:projectId" component={SingleProjectPage.callAPI} />
          <Route exact path="/verification/token=:token" component={VerificationPage}/>
        </Switch>
      </div>
    </HashRouter>
  );
}



export default App;