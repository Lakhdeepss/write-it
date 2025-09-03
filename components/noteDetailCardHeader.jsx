"use client";
import React, { useState } from "react";

const NoteDetailCardHeader = ({
    note,
    title,
    setTitle,
    handleSave,
    handleCopy,
    handleShare,
    readingTime,
    copied
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    return (
        <header className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-full h-14 w-14 flex items-center justify-center text-xl font-bold shadow-lg">
                    {title ? title.substring(0, 1).toUpperCase() : "N"}
                </div>
                <div>
                    {isEditingTitle ? (
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 rounded text-xl font-bold"
                            />
                            <button
                                onClick={() => {
                                    handleSave();
                                    setIsEditingTitle(false);
                                }}
                                className="px-3 py-1 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setTitle(note.title);
                                    setIsEditingTitle(false);
                                }}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <h1
                            className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight cursor-pointer"
                            onClick={() => setIsEditingTitle(true)}
                            title="Click to edit"
                        >
                            {title}
                        </h1>
                    )}


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
