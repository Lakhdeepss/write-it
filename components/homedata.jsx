"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteNote } from "@/actions/deletenote";

export const Homedata = ({ data }) => {
    const [notes, setNotes] = useState(data || []);

    const handleDelete = async (id) => {
        const response = await deleteNote(id);
        if (response?.success) {
            // filter out deleted note
            setNotes((prev) => prev.filter((note) => note._id !== id));
        }
    };

    return (
        <div className="grid gap-4 p-4 w-full max-w-lg">
            {notes?.map((note) => (
                <div
                    key={note._id}
                    className="bg-slate-100 border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl">{note.title}</h2>
                        <div className="flex gap-2">
                            <Link href={`/notesDetail/${note._id}`} passHref>
                                <Button variant="link" className="text-slate-500">
                                    View
                                </Button>
                            </Link>
                            <Button onClick={() => handleDelete(note._id)}>Delete</Button>
                        </div>
                    </div>
                    <p className="text-gray-500">{note.content}</p>
                </div>
            ))}
        </div>
    );
};
