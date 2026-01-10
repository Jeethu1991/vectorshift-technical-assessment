import BaseNode from './BaseNode';

export default function DelayNode(){
    return (
        <BaseNode title='Delay' input={['in']} outputs={['out']}>
            <p>Waits before passing data</p>
        </BaseNode>
    );
}