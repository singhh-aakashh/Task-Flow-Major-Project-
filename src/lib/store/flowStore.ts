import { create } from "zustand";
import { Node, Edge, Connection, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { stat } from "fs";

let nodeId = 1;

interface ReactFlowState {
  nodes: Node[];
  edges: Edge[];
  addNode: () => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
}

export const useReactFlowState = create<ReactFlowState>((set, get) => ({
  nodes: [
    {
      id: "1",
      position: { x: 550, y: 100 },
      data: { label: "Node 1"  },
      type: "customNode", 
    },
  ],
  edges: [],
  
  addNode: () => {
    const nodes = get().nodes;
    const edges = get().edges;

    const newNodeId = `${++nodeId}`;
    const lastNodeId = nodes[nodes.length - 1]?.id;

    const newNode: Node = {
      id: newNodeId,
      position: { x: 550, y: nodes.length*150+100 },
      data: { label: `Node ${newNodeId}` },
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
}));

interface flowStep{
  id : string,
  stepType : "TRIGGER" | "ACTION",
  triggerId?:string,
  actionId?:string,
  metaData?:any,
  stepNumber:number
}

interface Flow {
  id : string,
  userId : string,
  name : string,
  workFlowSteps : flowStep[],
  setName:(name:string)=>void,
  addFlowStep:()=>void,
  setTrigger:(flowStepId:string,triggerId:string)=>void,
  setAction:(flowStepId:string,actionId:string)=>void,
}

export const useFlow = create<Flow>((set)=>({
  id : uuidv4(),
  name:"Untitled Workflow",
  userId:"1",
  workFlowSteps:[{
    id:uuidv4(),
    stepType:"TRIGGER",
    stepNumber:1,
    metaData:{}
  },
 {
    id:uuidv4(),
    stepType:"ACTION",
    stepNumber:2,
    metaData:{}
 }],
 setName:(name)=>set({name}),
 addFlowStep:()=>set((state)=>({
  workFlowSteps:[
    ...state.workFlowSteps,
    {
      id:uuidv4(),
      stepType:"ACTION",
      stepNumber:state.workFlowSteps.length+1,
      metaData:{}
    },
  ]
 })),
 setTrigger:(flowStepId:string,triggerId:string)=>set((state)=>({
  workFlowSteps:state.workFlowSteps.map((step)=>step.id ===flowStepId ? {...step,triggerId:triggerId}:step)
 })),
 setAction:(flowStepId:string,actionId:string)=>set((state)=>({
  workFlowSteps:state.workFlowSteps.map((step)=>step.id===flowStepId?{...step,actionId:actionId}:step)
 }))
}))

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

