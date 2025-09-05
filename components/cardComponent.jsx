"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

export function CardComponent() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handlePost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            userId: session?.user?.id,
        };

        try {
            let response = await fetch("/api/add/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            let responseData = await response.json();
            console.log(responseData.message);

            router.push("/");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handlePost}>
                <CardHeader>
                    <CardTitle>New Note</CardTitle>
                    <CardDescription>Enter your note details below</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter your title here"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <textarea
                                id="content"
                                name="content"
                                className="border rounded h-20 p-2"
                                placeholder="Enter your note content here"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Add Note
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
