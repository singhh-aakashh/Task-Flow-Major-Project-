"use client";

import { Handle, Position } from "@xyflow/react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useFlowOptions, useFlow } from "@/lib/store/flowStore";

export const CustomNode = ({id,data}:any) => {
  return (
    <>
      <div className=" w-64 h-20 bg-black rounded-md outline-amber-50 outline flex justify-center" suppressHydrationWarning>
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
        >
        <Dialog nodeId={id} data={data} />
        
         
        </div>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
};

const Dialog = ({nodeId,data}:any) =>{
 
  const [isOpen, setIsOpen] = useState(false);
  const options = useFlowOptions();
  const {setTrigger} = useFlow();

  return(
    <>
    <AlertDialog>
    <AlertDialogTrigger className="w-full">{data.label}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>
        <VisuallyHidden>Are you sure?</VisuallyHidden>
      </AlertDialogTitle>
      <Card>
        <CardHeader>
          <CardTitle>Your Apps</CardTitle>
          <CardDescription>Choose from here</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {options.triggers.map((trigger)=><AlertDialogAction key={trigger.id} onClick={()=>setTrigger(nodeId,trigger.id)} className="flex space-x-4"><img src={trigger.image} className="w-8" /><p>{trigger.name}</p></AlertDialogAction>)}
        </CardContent>
      </Card>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => setIsOpen(true)}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

<Drawer open={isOpen} onOpenChange={setIsOpen}>
<DrawerContent>
  <DrawerHeader>
    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
    <DrawerDescription>This action cannot be undone.</DrawerDescription>
  </DrawerHeader>
  <DrawerFooter>
    <Button onClick={() => setIsOpen(false)}>Submit</Button>
    <DrawerClose>
      <Button variant="outline">Cancel</Button>
    </DrawerClose>
  </DrawerFooter>
</DrawerContent>
</Drawer>
</>
  )
}
