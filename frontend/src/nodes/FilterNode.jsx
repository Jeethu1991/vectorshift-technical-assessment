import BaseNode from './BaseNode';

export default function FilterNode(){
    return (
        <BaseNode title='Filter' inputs={["data"]} outputs={["filtered"]}>
            <p>Condition based filter</p>
        </BaseNode>
    );
}