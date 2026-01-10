import { useEdges, useNodes } from 'reactflow';
import BaseNode from './BaseNode';

export default function ResultNode({ id }){
    const edges = useEdges();
    const nodes = useNodes();

    const incomingEdge = edges.find((edge) => edge.target === id);
    const sourceNode = nodes.find((node) => node.id === incomingEdge?.source);

    const value = sourceNode?.data?.value;

    return(
        <BaseNode title='Final Result' inputs={['in']} outputs={[]}>
            <div style={{
                padding: 10,
                minHeight:60,
                background: '#f5f5f5',
                borderRadius: 4,}}>
                {value || 'No input yet'}
            </div>

        </BaseNode>
    );
}