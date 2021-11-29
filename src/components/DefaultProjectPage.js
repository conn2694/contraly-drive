import React from "react";
import { Link } from "react-router-dom";

const sql = require("../modules/sqlModule")


const DefaultProjectPage = (props) => {


    let content = '';
    const [projects, setProjects] = React.useState("");
    
    React.useEffect(() => {
        const fetchProjects = async () => {
            const invokeResult = await sql.getProjectsPromise;
            invokeResult.map(res => console.log(res))
            setProjects(invokeResult);
        };
        fetchProjects();
    }, []);


    if(!projects){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else {

        content = (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(proj => createRow(proj))}
                    </tbody>
                </table>
            </div>
        )

    }

    function createRow(project){
        return (
            <tr key={project.idProject}>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.idProject}
                </td>
            </tr>
        )
    }


    return(
        <div>
            <h1>Projects</h1>
            <div className = "ProjectComp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {content}
            </div>
            <p><Link to="/"><button>Home</button></Link></p>
        </div>
    )

}

export default DefaultProjectPage;