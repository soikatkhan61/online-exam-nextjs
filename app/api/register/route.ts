import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody{
    fullName: string;
    college: string;
    zilla: string;
    phone: string;
    password: string;
}


export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    try {
        const userExistence = await prisma.user.findUnique({
            where: {
                phone: body.phone
            }
        });

        if (userExistence) {
            throw new Error("User with the provided phone number already exists");
        }

        const user = await prisma.user.create({
            data: {
                name: body.fullName,
                college: body.college,
                zilla: body.zilla,
                phone: body.phone,
                password: await bcrypt.hash(body.password, 11),
                isVerified: false,
                role:'user'
            }
        });

        const { password, ...result } = user;

        return new Response(JSON.stringify(result),{status: 200});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error message:", error.message);
            console.error(error);
        
            // Pass the error message in the response
            return new Response(null, { status: 500,statusText:error.message });
        } else {
            console.error("Unknown error:", error);
            return new Response(null, { status: 500,statusText:"Unknwon Error" });
        }
    }
}
