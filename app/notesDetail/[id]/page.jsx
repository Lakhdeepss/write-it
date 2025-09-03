"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNotesDetails } from "@/actions/getNotesDetails";
import NoteDetailCardHeader from "@/components/noteDetailCardHeader";
import PageLoader from "@/components/pageLaoder";
import { editNote } from "@/actions/editnote";

const NotesDetailPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchNote() {
            const data = await getNotesDetails(id);
            setNote(data);
            setTitle(data.title || "");
            setContent(data.content || "");
        }
        fetchNote();
    }, [id]);

    const handleSave = async () => {
        if (!note) return;
        try {
            const updated = await editNote(note._id, title, content);
            setNote(updated);
            setTitle(updated.title);
            setContent(updated.content);
            console.log("Note updated successfully:", updated);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating note:", err);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Copy failed", e);
        }
    };

    const handleShare = async () => {
        const shareData = { title, text: content };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // cancelled or not supported
            }
        } else {
            await handleCopy();
            alert("Note content copied to clipboard");
        }
    };

    const readingTime =
        content && content.trim()
            ? Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
            : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8">
            {note ? (
                <article className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <NoteDetailCardHeader
                        title={title}
                        setTitle={setTitle}
                        note={note}
                        handleSave={handleSave}
                        handleCopy={handleCopy}
                        handleShare={handleShare}
                        readingTime={readingTime}
                        copied={copied}
                    />

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    <section className="p-6 sm:p-8">
                        {isEditing ? (
                            <div className="flex flex-col space-y-4">
                                <textarea
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                                    rows={10}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />

                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setContent(note.content);
                                            setIsEditing(false);
                                        }}
                                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                                {content}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="ml-4 text-sm text-orange-500 hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </section>

                    <footer className="p-6 sm:p-8 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
                        <div>
                            {note.createdAt ? (
                                <span>Created {new Date(note.createdAt).toLocaleString()}</span>
                            ) : (
                                <span>Saved to your notes</span>
                            )}
                        </div>
                        <div className="text-xs text-gray-400">Write-It</div>
                    </footer>
                </article>
            ) : (
                <PageLoader />
            )}
        </div>
    );
};

export default NotesDetailPage;
