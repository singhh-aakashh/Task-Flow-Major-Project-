"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { fetchTemplate } from "@/lib/db/db";

export default function Page(){

    const [username,setUsername]= useState<string>("Aakash");


    // const [emailTemp,setEmailTemp] = useState<string>("");
    const {id}:{id:string[]} = useParams();
//     console.log(id[0])
//     useEffect(()=>{
//         const emailHtml = async()=>{
//     const res =await fetchTemplate(id[0])
//     if(res) setEmailTemp(res)
//     }
// emailHtml()      
//     },[id])

const emailTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Signing In</title>
    <style>
        body {
            background-color: #1a1a1a;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #2d2d2d;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #4CAF50;
            margin: 0;
            font-size: 28px;
        }
        .content {
            line-height: 1.6;
        }
        .content p {
            margin: 15px 0;
        }
        .button {
            text-align: center;
            margin: 20px 0;
        }
        .button a {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
        .button a:hover {
            background-color: #45a049;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
            padding-top: 20px;
            border-top: 1px solid #3d3d3d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome Aboard!</h1>
        </div>
        <div class="content">
            <p>Hello ${username},</p>
            <p>Thank you for signing in to [Your Company/Service Name]! We're thrilled to have you with us.</p>
            <p>Your account is now active, and you can start exploring all the features and benefits we have to offer. Whether you're here to [briefly state purpose/benefit], we're committed to providing you with the best experience possible.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team anytime.</p>
        </div>
        <div class="button">
            <a href="[Your Website URL]" target="_blank">Get Started Now</a>
        </div>
        <div class="footer">
            <p>© 2025 [Your Company Name]. All rights reserved.</p>
            <p>[Your Company Address] | <a href="mailto:support@[yourdomain].com" style="color: #4CAF50;">support@[yourdomain].com</a></p>
        </div>
    </div>
</body>
<script>

</script>
</html>`
    return(
        <div className="p-4 w-full flex">
            <div className="w-[50%]" dangerouslySetInnerHTML={{ __html: emailTemp }} />
            <div className="w-[50%]" ></div>
        </div>
    )
}