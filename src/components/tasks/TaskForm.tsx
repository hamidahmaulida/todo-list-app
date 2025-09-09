"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { TodoWithExtras } from "@/types/task";

interface TaskFormProps {
  initialData?: Partial<TodoWithExtras>;
  existingTags: string[];
  onChange?: (updated: Partial<TodoWithExtras>) => void;
  onCharChange?: (count: number) => void;
  readOnly?: boolean;
}

export default function TaskForm({
  initialData,
  existingTags,
  onChange,
  onCharChange,
  readOnly = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync with initialData when it changes
  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setContent(initialData?.content ?? "");
    setTags(initialData?.tags ?? []);
  }, [initialData?.title, initialData?.content, initialData?.tags]);

  // Notify parent of changes
  useEffect(() => {
    if (onCharChange) onCharChange(title.length + content.length);
    onChange?.({ title, content, tags });
  }, [title, content, tags, onChange, onCharChange]);

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) setTags([...tags, trimmed]);
    setTagInput("");
    setShowDropdown(false);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const filteredTags: string[] = existingTags.filter(
    (t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(t)
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={readOnly}
        placeholder="Task title"
        className="w-full text-xl font-semibold border-b focus:outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
      />

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#0F766E] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
            >
              {tag}
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-white/80 hover:text-white"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {!readOnly && (
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Add a tag..."
              className="w-full border rounded px-2 py-1 text-sm outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
            />

            {showDropdown && (filteredTags.length > 0 || tagInput) && (
              <div className="absolute mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto z-50">
                {filteredTags.map((tag: string) => (
                  <div
                    key={tag}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm text-gray-900"
                    onClick={() => handleAddTag(tag)}
                  >
                    {tag}
                  </div>
                ))}
                {tagInput && (
                  <div
                    className="px-2 py-1 flex items-center gap-1 text-sm text-blue-600 cursor-pointer hover:bg-blue-50"
                    onClick={() => handleAddTag(tagInput)}
                  >
                    <FiPlus /> Create &quot;{tagInput}&quot;
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={readOnly}
        placeholder="Write your task..."
        className="w-full h-40 border p-2 rounded-md focus:outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
      />
    </div>
  );
}
