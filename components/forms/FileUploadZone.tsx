"use client"

import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  id: string
  label: string
  description?: string
  accept?: string
  multiple?: boolean
  required?: boolean
  files: File[]
  onFilesChange: (files: File[]) => void
  error?: string
  disabled?: boolean
  maxSizeMB?: number
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploadZone({
  id,
  label,
  description,
  accept,
  multiple = false,
  required = false,
  files,
  onFilesChange,
  error,
  disabled = false,
  maxSizeMB = 50,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [sizeError, setSizeError] = useState("")

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      setSizeError("")
      const newFiles: File[] = []
      const rejected: string[] = []

      Array.from(incoming).forEach((file) => {
        if (file.size > maxSizeBytes) {
          rejected.push(`"${file.name}" exceeds the ${maxSizeMB}MB limit`)
        } else {
          newFiles.push(file)
        }
      })

      if (rejected.length > 0) {
        setSizeError(rejected.join(". "))
      }

      if (newFiles.length > 0) {
        if (multiple) {
          onFilesChange([...files, ...newFiles])
        } else {
          onFilesChange(newFiles.slice(0, 1))
        }
      }
    },
    [files, multiple, maxSizeBytes, maxSizeMB, onFilesChange]
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
      if (disabled) return
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [disabled, processFiles]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files)
      }
      // Reset input so same file can be re-selected
      e.target.value = ""
    },
    [processFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index))
    },
    [files, onFilesChange]
  )

  return (
    <div id={id}>
      <label className="block text-sm font-medium text-navy-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-gold-500 bg-gold-500/5"
            : "border-navy-300 hover:border-gold-500 bg-white",
          error && "border-red-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <svg
          className="w-10 h-10 mx-auto mb-3 text-navy-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-navy-900 font-medium text-sm">
          {isDragActive ? "Drop files here" : "Drag & drop files here, or click to browse"}
        </p>
        {description && (
          <p className="text-navy-500 text-xs mt-1">{description}</p>
        )}
        <p className="text-navy-400 text-xs mt-1">Max {maxSizeMB}MB per file</p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {(error || sizeError) && (
        <p className="text-red-500 text-sm mt-1">{error || sizeError}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between bg-navy-50 rounded-md px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg
                  className="w-4 h-4 text-navy-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-navy-900 truncate">{file.name}</span>
                <span className="text-navy-500 flex-shrink-0">
                  ({formatFileSize(file.size)})
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="text-navy-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
