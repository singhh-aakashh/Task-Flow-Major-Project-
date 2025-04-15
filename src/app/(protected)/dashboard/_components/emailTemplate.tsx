"use client"
import React, { useState, useEffect } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface EmailTemplate {
    id: number;
    title: string;
    description: string;
    bgColor: string;
    image: string;
  }

const EmailTemplates = () => {
  // Sample data for email templates (replace with API call if needed)
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);

  useEffect(() => {
    // Simulate API call
    const templates :EmailTemplate[]= [
      { id: 1, title: 'Blank Template', description: 'Start from scratch', bgColor: 'bg-white', image: '/placeholder1.jpg' },
      { id: 2, title: "Mother's Day", description: 'Made with Love', bgColor: 'bg-pink-100', image: '/placeholder2.jpg' },
      { id: 3, title: 'Easter Deals', description: 'Hop into Travel Deals!', bgColor: 'bg-blue-100', image: '/placeholder3.jpg' },
      { id: 4, title: 'Easter-Ready', description: 'Refreshment', bgColor: 'bg-green-100', image: '/placeholder4.jpg' },
      { id: 5, title: 'Sustainable Style', description: 'Better Tomorrow', bgColor: 'bg-teal-100', image: '/placeholder5.jpg' },
    ];
   if(templates) setEmailTemplates(templates);
  }, []);

  return (
    <div className="flex h-screen w-full space-x-4 text-white">
        {
            emailTemplates.map((template:EmailTemplate)=>
                <Card className='w-52 h-80'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>)
        }
      </div>
  );
};

export default EmailTemplates;