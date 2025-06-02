"use client"

import { useState, useRef } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { Image, Upload, X } from "lucide-react"
import { toast } from "sonner"

interface ImageInputProps {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    name?: string
}

export function ImageInput({ value = "", onChange, onBlur, name }: ImageInputProps) {
    const [isUploading, setIsUploading] = useState(false)
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
            toast.success('Image uploaded successfully')
        } catch (error) {
            console.error('Error uploading file:', error)
            toast.error('Failed to upload image')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex gap-2">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
            >
                {isUploading ? (
                    <Upload className="h-4 w-4 animate-spin" />
                ) : (
                    <Upload className="h-4 w-4" />
                )}
            </Button>
            {value && (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onChange("")}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
            {value && (
                <div className="relative h-10 w-10">
                    <Image className="h-10 w-10 object-cover rounded-md" src={value} alt="Preview" />
                </div>
            )}
        </div>
    )
}
