import BaseNode from './BaseNode';

export default function ApiNode(){
    return(
        <BaseNode title='API Call' inputs={['request']} outputs={['response']}>
            <p>External API</p>    
        </BaseNode>
    )
}