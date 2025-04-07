import { prisma } from "../../prisma"

export const getUserFlows = async(userId:string)=>{
    try {
        const flows = await prisma.flow.findMany({
            where:{
                userId
            }
        })
        return {flows}
    } catch (error) {
        console.log(error);
        return {"error":"error while finding flows"}
    }
}