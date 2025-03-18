import { prisma } from "../../../prisma";

export const getUserByEmail = async (email:string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const createUser = async (email:string,password:string) => {
    try {
        const user = await prisma.user.create({
            data:{
                email,
                password
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}