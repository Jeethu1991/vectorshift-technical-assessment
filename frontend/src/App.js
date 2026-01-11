import React,{useState} from "react";
import ReactFlow, { applyNodeChanges, applyEdgeChanges, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from './nodes/InputNode';
import TextNode from './nodes/TextNode';
import OutputNode from './nodes/OutputNode';
import ResultNode from './nodes/ResultNode';

const nodeTypes = {
      input: InputNode,
      text: TextNode,
      output: OutputNode,
      result: ResultNode,        
  };

function FlowApp(){
  const [nodes, setNodes] = useState([
    { id: 'input', type: 'input', position: { x: 0, y: 100}, data: {label: 'Start of Pipeline'}},
    { id: 'text', type: 'text', position: {x: 250, y: 100}, data:{value: ''}},
    { id: 'output', type: 'output', position: {x: 550, y: 100}, data: {value: ''}},
  ]);

  const [edges, setEdges] = useState([
    {id: 'e1-2', source: 'input', sourceHandle: 'out', target: 'text', targetHandle: 'in', animated: true},
    {id: 'e2-3', source: 'text', sourceHandle: 'out', target: 'output', targetHandle: 'in', animated: true},

  ]);

  const { getNodes, getEdges } = useReactFlow();

  async function sendPipeline() {
    const nodesData = getNodes();
    const edgesData = getEdges();

    const payload = {
      nodes: nodesData.map(node => ({ id: node.id})),
      edges: edgesData.map(edge => ({
        id: edge.id || `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
      })),
    };

    try{
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse",{
        method: "POST",
        headers: { "content-Type": "application/json"},
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Backend Response: ", data);

      setNodes(prev => 
        prev.map(node =>
          node.id === 'output' ? { ...node, data: { ...node.data, value: data.is_dag ? "DAG ✅" : "Cycle ❌" }} : node
        )
      );
    } 
    catch (error){
      console.error("Error sending pipeline: ", error);
      setNodes((node) => nodes.map((node) => node.id === 'output' ? {...node, data: { ...node.data, value: "Validation failed ❌" }} : node));
    }
  }

  return(
    <div style={{width: '100vw', height: '100vh' }}>
      <button onClick={sendPipeline} style={{position: 'absolute', backgroundColor: "white", zIndex: 1000, left: 570, top: 420, padding: '8px 16px', pointerEvents: 'auto' }}>
        Check Pipeline
      </button>

      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
                 onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
                 onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
                 nodesDraggable={false}
                 fitView />
    </div>
  );
}

export default function App(){
  return(
    <ReactFlowProvider>
      <FlowApp/>
    </ReactFlowProvider>
  );
}


