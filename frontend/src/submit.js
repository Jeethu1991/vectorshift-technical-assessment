// export async function submitPipeline(nodes,edges){
export async function sendPipeline(nodes,edges){
    try{
        const response = await fetch("http://localhost:8000/pipelines/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nodes,
                edges
            })
        });

        const data = await response.json();

        alert(
            `Pipeline Summary:
            Nodes: ${data.num_nodes}
            Edges: ${data.num_edges}
            Is DAG: ${data.is_dag}`
        );
    }
    catch(error){
        alert("Failed to submit pipeline");
        console.error(error);
    }
}