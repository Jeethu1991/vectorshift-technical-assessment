import React from 'react';
import ReactFlow, {Background, Controls} from 'reactflow';
import 'reactflow/dist/style.css';

import InputNode from './nodes/InputNode';
import TextNode from './nodes/TextNode';
import OutputNode from './nodes/OutputNode';

import { handleSubmit } from './submit';

const nodeTypes = {
    input: InputNode,
    Text: TextNode,
    output: OutputNode
};

const nodes = [
    {id: '1', type: 'input', position: {x:100, y:200}, data: {}},
    {id: '2', type: 'text', position: {x: 350, y: 200}, data: {}},
    {id: '3', type: 'output', position: {x: 650, y: 200}, data: {}},
];

const edges = [];

export default function App(){
    return (
        <div className='app'>
            <header className='header'>
                <h1>VectorShift Pipeline Builder</h1>
                <p>Frontend Technical Assessment</p>
            </header>

            <main className='canvas'>
                <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
                    <Background gap={16}/>
                    <controls />
                    <ReactFlow />
                </ReactFlow>
            </main>

            <footer className='footer'>
                <button className='submit-btn' onClick={() => handleSubmit(nodes, edges)}>Submit Pipe</button>
            </footer>
        </div>
    );
}