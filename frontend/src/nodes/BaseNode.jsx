import React from 'react';
import { Handle, Position } from 'reactflow';
import './nodestyles.css';

export default function BaseNode({ title, inputs = ['in'], outputs = ['out'], children }) {
  return (
    <div className="base-node">
      <div className="node-header">{title}</div>

      {inputs.map((input, index) => (
        <Handle
          key={input}
          id={input}
          type="target"
          position={Position.Left}
          style={{ top: `${50 + index * 20}px` }}
        />
      ))}

      <div className="node-body">{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={output}
          id={output}
          type="source"
          position={Position.Right}
          style={{ top: `${50 + index * 20}px` }}
        />
      ))}
    </div>
  );
}

