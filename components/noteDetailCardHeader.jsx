"use client";
import React, { useState } from "react";
import { editNote } from "@/actions/editnote";


const NoteDetailCardHeader = ({ note, handleCopy, handleShare, readingTime, copied }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSave = async () => {
        try {
            await editNote(note._id, title, content); // ✅ extend server action to handle title
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving title:", err);
        }
    };

    return (
        <header className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-full h-14 w-14 flex items-center justify-center text-xl font-bold shadow-lg">
                    {title ? title.substring(0, 1).toUpperCase() : "N"}
                </div>
                <div>
                    {isEditing ? (
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 rounded text-xl font-bold"
                            />
                            <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setTitle(note.title); // reset if cancel
                                }}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <h1
                            className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight cursor-pointer"
                            onClick={() => setIsEditing(true)}
                            title="Click to edit"
                        >
                            {title}
                        </h1>
                    )}

                    <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-3 items-center">
                        {readingTime && <span>{readingTime} min read</span>}
                        {note.updatedAt && (
                            <span>• Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                        )}
                        {note.tags?.length ? (
                            <span className="flex gap-2">
                                {note.tags.map((t, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 text-sm shadow-sm hover:shadow focus:outline-none"
                    aria-label="Go back"
                >
                    ← Back
                </button>

                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none shadow-sm"
                    aria-label="Copy note"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>

                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 text-sm hover:shadow focus:outline-none"
                    aria-label="Share note"
                >
                    Share
                </button>
            </div>
        </header>
    );
};

export default NoteDetailCardHeader;
