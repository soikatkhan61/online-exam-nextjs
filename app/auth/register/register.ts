"use server"
import prisma from '@/lib/prisma';

export default async function findSoikat(){
    "use server"
    let user = await prisma.user.findUnique({
         where: {
             phone:"asdgasdg"
         }
     })
     console.log(user);
   }