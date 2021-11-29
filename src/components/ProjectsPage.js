import { Component } from "react";
import { Link } from "react-router-dom";

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: [] };
    }

    callAPI() {
        fetch("http://localhost:3001/projects")
            .then(res => res.json())
            .then(data => {
                this.setState({ apiResponse: data })
            })
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    createRow(project) {
        return (
            <tr key={project.idProject}>
                <td>
                    {project.idProject}
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    <Link to={`/projects/${project.idProject}`}>More</Link>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h1>
                    All Projects
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.apiResponse.map(project => this.createRow(project))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ProjectPage;