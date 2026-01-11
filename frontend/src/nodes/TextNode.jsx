import {useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import React from 'react';

export default function TextNode({ id, data }) {
    const { getNodes, getEdges, setNodes } = useReactFlow();

    const sendPipeline = async(textValue) => {
        const nodes = getNodes();
        const edges = getEdges();

        const payload = { 
            nodes: nodes.map((node) => ({id:node.id})),
            edges: edges.map((edge) => ({
                id: edge.id || `${edge.source}-${edge.target}`,
                source: edge.source,
                target: edge.target,
            })),
        };

        try{
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log('Backend Response:', result);

            setNodes((nodes) => 
            nodes.map((node) => {
                if(node.id === id){
                    return{ ...node, data: { ...node.data, value: textValue}};
                }

                if(node.id === 'output'){
                    return{
                        ...node,
                        data: { ...node.data, value: result.is_dag ? `${textValue}` : `No input yet`},
                    };
                }
                return node;
            }));
        } 
        catch (error){
            console.error('Error sending pipeline: ', error);
        }
    };

    const onChange = (e) => {
        const value = e.target.value;
        sendPipeline(value);
    };

    return(
        <BaseNode title="Text" inputs={['in']} outputs={['out']}>
            <div className="noderag">
                <textarea placeholder="Enter text..."
                 value={data.value}
                 onChange={onChange}
                 style={{width: '100%', resize: 'none', minHeight: '60px'}} />
            </div>
        </BaseNode>
    );
}