import BaseNode from './BaseNode';

export default function LLMNode(){
    return (
        <BaseNode title="LLM" inputs={["prompt"]} outputs={["completion"]}>
            <p>AI Processors</p>
        </BaseNode>
    );
}