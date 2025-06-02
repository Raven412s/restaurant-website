"use client"

import { useState, useRef } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Image as ImageIcon, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ImageInputProps {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    name?: string
}

export function ImageInput({ value = "", onChange, onBlur, name }: ImageInputProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [previewError, setPreviewError] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB')
            return
        }

        try {
            setIsUploading(true)
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            onChange(data.url)
            setPreviewError(false)
            toast.success('Image uploaded successfully')
        } catch (error) {
            console.error('Error uploading file:', error)
            toast.error('Failed to upload image')
        } finally {
            setIsUploading(false)
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleImageError = () => {
        setPreviewError(true)
        toast.error('Failed to load image preview')
    }

    return (
        <div className="flex gap-2 items-center">
            <Input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    setPreviewError(false)
                }}
                onBlur={onBlur}
                name={name}
                placeholder="Enter image URL or upload a file"
                className="flex-1"
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Upload image"
            >
                {isUploading ? (
                    <Upload className="h-4 w-4 animate-spin" />
                ) : (
                    <Upload className="h-4 w-4" />
                )}
            </Button>
            {value && (
                <>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            onChange("")
                            setPreviewError(false)
                        }}
                        title="Clear image"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="relative h-10 w-10">
                        {!previewError ? (
                            <Image
                                src={value}
                                alt="Preview"
                                fill
                                className="h-10 w-10 object-cover rounded-md"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
