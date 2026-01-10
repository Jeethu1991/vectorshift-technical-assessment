from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str | None = None
    data: Dict | None = None

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = defaultdict(list)
    indegree = defaultdict(int)

    for node in nodes:
        indegree[node.id] = 0

    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    if not is_dag(pipeline.nodes, pipeline.edges):
        raise HTTPException(
            status_code=400,
            detail="Pipeline contains a cycle"
        )

    return{
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": False
    }
