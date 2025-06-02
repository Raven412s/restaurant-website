"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ImageInput } from "@/components/ui/image-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Trash2 } from "lucide-react"

const itemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
    image: z
        .string()
        .refine(
            (val) => !val || val.startsWith("http") || val.startsWith("/uploads"),
            {
                message: "Must be a valid image path or URL",
            }
        ),
})

const subSectionSchema = z.object({
    section: z.string().optional(),
    items: z.array(itemSchema),
})

const formSchema = z.object({
    title: z.string().min(1, "Menu title is required"),
    sections: z.array(subSectionSchema),
})

type FormValues = z.infer<typeof formSchema>

type ItemFieldKey = keyof typeof itemSchema.shape;

export default function AddMenuItemForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            sections: [
                {
                    section: "",
                    items: [
                        {
                            name: "",
                            price: "",
                            description: "",
                            image: "",
                        },
                    ],
                },
            ],
        },
        mode: "onChange",
    })

    const {
        fields: sectionFields,
        append: appendSection,
        remove: removeSection,
    } = useFieldArray({
        control: form.control,
        name: "sections",
    })

    const onSubmit = async (data: FormValues) => {
        try {
            console.log("Submitting data:", data)
            const response = await fetch("/api/menu-sections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to save menu section")
            }

            const result = await response.json()
            toast.success("Menu section saved successfully")
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(result, null, 2)}</code>
                </pre>
            )

            form.reset()
        } catch (error) {
            console.error("Error saving menu section:", error)
            toast.error("Failed to save menu section. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-4xl mx-auto p-8"
            >
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Menu Section Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Starters, Signature, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Subsections */}
                {sectionFields.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="border p-4 rounded-lg space-y-4 bg-gray-50 relative"
                    >
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 text-red-500"
                            onClick={() => removeSection(sectionIndex)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <FormField
                            control={form.control}
                            name={`sections.${sectionIndex}.section`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subsection Label (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., New, Recommended, etc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ItemFields sectionIndex={sectionIndex} form={form} />
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        appendSection({
                            section: "",
                            items: [{ name: "", price: "", description: "", image: "" }],
                        })
                    }
                >
                    Add New Subsection
                </Button>

                <Button type="submit" className="w-full">
                    Save Menu Section
                </Button>
            </form>
        </Form>
    )
}

function ItemFields({
    sectionIndex,
    form,
}: {
    sectionIndex: number
    form: ReturnType<typeof useForm<FormValues>>
}) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `sections.${sectionIndex}.items`,
    })

    const renderField = (itemIndex: number, fieldKey: ItemFieldKey) => {
        if (fieldKey === 'image') {
            return (
                <FormField
                    control={form.control}
                    name={`sections.${sectionIndex}.items.${itemIndex}.${fieldKey}`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <ImageInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )
        }

        return (
            <FormField
                control={form.control}
                name={`sections.${sectionIndex}.items.${itemIndex}.${fieldKey}`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={fieldKey === "price" ? "$12.00" : ""}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-lg">Items</h4>
            {fields.map((item, itemIndex) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end relative">
                    {Object.keys(itemSchema.shape).map((fieldKey) => (
                        <div key={fieldKey}>
                            {renderField(itemIndex, fieldKey as ItemFieldKey)}
                        </div>
                    ))}
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute -top-2 -right-2 text-red-500"
                        onClick={() => remove(itemIndex)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="secondary"
                onClick={() =>
                    append({ name: "", price: "", description: "", image: "" })
                }
            >
                Add Item
            </Button>
        </div>
    )
}
