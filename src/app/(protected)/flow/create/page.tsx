"use client"
import React from 'react';
import { Background, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus } from 'lucide-react';
import { useFlow } from '@/lib/store/flowStore';
import { CustomNode } from '@/components/react-flow/customNode';

// page is using custom nodes which is shown 


// 🔹 Custom Node Type Mapping
const nodeTypes = { customNode: CustomNode };


export default function Page() {
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect } = useFlow();

  const print = () =>{
    console.log(nodes)
  }
     
  return (
    <div style={{ width: '100%', height: '100%' ,padding:'2px' }}>
           <ReactFlow 
        colorMode='dark'
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <button className="p-[1px]  relative z-10" onClick={addNode} >
        <div className="absolute inset-0 bg-gradient-to-r rounded-full from-indigo-500 to-purple-500 " />
        <div className="px-2 text-xl py-2  bg-black rounded-full  relative group transition duration-200 text-white hover:bg-transparent">
          <Plus/>
        </div>
      </button>
        <Background />
      </ReactFlow>

    </div>
  );
}

