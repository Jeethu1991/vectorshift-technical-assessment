import React from 'react';
import BaseNode from './BaseNode';

export default function OutputNode({ data }) {
  return (
    <BaseNode title="Output" inputs={['in']} outputs={[]}>
      <strong>Final Result</strong>
      <div>{data?.value || 'No input yet'}</div>
    </BaseNode>
  );
}

