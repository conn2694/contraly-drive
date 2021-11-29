import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function SingleProjectPage() {

    const { projectId } = useParams();
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/projects/${projectId}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            })
            .then(data => {
                setFolders(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [projectId]);

    function createRow(folder) {
        return (
            <tr key={folder.idFolder}>
                <td>
                    {folder.idFolder}
                </td>
                <td>
                    {folder.name}
                </td>
                <td>
                    {folder.autosync}
                </td>
                <td>
                    {folder.Project_idProject}
                </td>
            </tr>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Autosync</th>
                            <th>Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map((f) => createRow(f))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}