import BaseNode from './BaseNode';

export default function InputNode({data}){
    return (
        <BaseNode title='Input' inputs={[]} outputs={['out']} className='base-node' style={{padding: 8}}>
            <strong>{data.label}</strong>
        </BaseNode>
    );
}