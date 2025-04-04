import { create } from "zustand";
import {  Edge, Connection, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

let nodeId = 2;

interface ReactFlowState {
  id:string,
  userId:string,
  name:string,
  nodes: Node[];
  edges: Edge[];
  addNode: () => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  setTrigger:(nodeId:string,triggerId:string)=>void;
}

interface Node{
  id:string,
  data:{
    label:"Trigger" | "Action" |"Webhook"
  }
  triggerId?:string,
  actionId?:string,
  metaData?:any,
  position:{
    x:number,
    y:number
  },
  type:"customNode",
}

export const useFlow = create<ReactFlowState>((set, get) => ({
  id: uuidv4(),
  name:"Untitled Workflow",
  userId:"1",
  nodes: [
    {
      id: "1",
      position: { x: 550, y: 150 },
      data: { label: "Trigger"  },
      type: "customNode", 
    },
    {
      id:"2",
      position:{x:550,y:300},
      data:{label:"Action"},
      type:"customNode"
    }
  ],
  edges: [
    {id:`e1-2`,source:"1", target:"2",animated:true}
  ],
  
  addNode: () => {
    const nodes = get().nodes;
    const edges = get().edges;

    const newNodeId = `${++nodeId}`;
    const lastNodeId = nodes[nodes.length - 1]?.id;

    const newNode: Node = {
      id: newNodeId,
      position: { x: 550, y: (nodes.length+1)*150 },
      data: { label: "Action" },
      type: "customNode", 
    };

    set({
      nodes: [...nodes, newNode],
      edges: lastNodeId ? [...edges, { id: `e${lastNodeId}-${newNodeId}`, source: lastNodeId, target: newNodeId ,animated:true}] : edges,
    });
  },

  onNodesChange: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  onEdgesChange: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
  onConnect: (connection) => set((state) => ({ edges: addEdge(connection, state.edges) })),
  setTrigger:(nodeId:string,triggerId:string)=> set((state) => ({nodes:state.nodes.map((node)=>node.id===nodeId?{...node,triggerId:triggerId,data:{label:"Webhook"}}:node)}))
}));

interface OptionsType {
  actions:{
  id:string,
  name:string,
  image:string,
  }[],
  triggers:{
      id:string,
      name:string,
      image:string,
  }[]
}

export const useFlowOptions = create<OptionsType>(()=>({
  actions:[{
      id:"f5b7612d-4482-4bc2-9bb6-3c076accea5f",
      image:"https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-email-mail-application-vector-png-image_9183278.png",
      name:"Email"
  }],
  triggers:[{
      id:"645f2f25-b132-4d98-a715-ab501e8f8186",
      image:"https://plugins.jetbrains.com/files/16984/260965/icon/pluginIcon.png",
      name:"Webhook"
  }]
}))

