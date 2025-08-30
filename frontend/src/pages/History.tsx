"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Search, Filter, Download, Trash2, MoreVertical, ImageIcon, Grid3X3, List, Scissors, Palette, Zap, Eraser, RefreshCw}from "lucide-react"
import { AppContext } from "@/context/AppContext"


export default function History() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [filterBy, setFilterBy] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const context = useContext(AppContext);

    const getToolIcon = (tool: string) => {
        switch (tool) {
            case "Remove Background":
                return Scissors
            case "Change Background":
                return Palette
            case "Enhance Resolution":
                return Zap
            case "Remove Objects":
                return Eraser
            case "Convert Format":
                return RefreshCw
            default:
                return ImageIcon
        }
    }

    const getToolColor = (tool: string) => {
        switch (tool) {
            case "Remove Background":
                return "from-emerald-500 to-teal-600"
            case "Change Background":
                return "from-emerald-600 to-green-700"
            case "Enhance Resolution":
                return "from-teal-500 to-emerald-600"
            case "Remove Objects":
                return "from-green-500 to-emerald-600"
            case "Convert Format":
                return "from-emerald-500 to-green-600"
            default:
                return "from-gray-500 to-gray-600"
        }
    }

    const filteredItems = context?.history?.filter((item) => {
        const matchesSearch = item.sourceType.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterBy === "all" || item.sourceType === filterBy
        return matchesFilter && matchesSearch
    })

    useEffect(() => {
        if (context && context.getAllUserHistory) {
            context.getAllUserHistory();
        }
    } ,[context?.getAllUserHistory , context?.history])

    

    return (
        <div className="min-h-screen bg-background mb-10">

            <div className="container px-4 py-20 mx-auto max-w-7xl ">
                {/* Filters and Search */}
                <Card className="border-0 bg-primary/15 rounded-lg shadow-lg mb-8 p-0 text-white">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by Source Type..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 focus:ring-0 focus:ring-offset-0 border-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Select value={filterBy} onValueChange={setFilterBy}>
                                    <SelectTrigger className="w-[180px] border-none focus:ring-0 focus:ring-offset-0">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter by tool" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Tools</SelectItem>
                                        <SelectItem value="Remove Background">Remove Background</SelectItem>
                                        <SelectItem value="Change Background">Change Background</SelectItem>
                                        <SelectItem value="Enhance Resolution">Enhance Resolution</SelectItem>
                                        <SelectItem value="Remove Objects">Remove Objects</SelectItem>
                                        <SelectItem value="Convert Format">Convert Format</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex border rounded-lg">
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className={viewMode === "grid" ? "gradient-primary text-white border-0" : ""}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className={viewMode === "list" ? "gradient-primary text-white border-0" : ""}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* History Items */}
                {filteredItems?.length === 0 ? (
                    <Card className="border-0 shadow-lg bg-secondary/12">
                        <CardContent className="p-12 text-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                            <h3 className="font-heading text-xl font-semibold mb-2 text-white">No images found</h3>
                            <p className="text-muted-foreground text-2xl">
                                {searchQuery || filterBy !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Start editing images to see your history here"}
                            </p>
                        </CardContent>
                    </Card>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                        {filteredItems?.map((item) => {
                            const ToolIcon = getToolIcon(item.tool)
                            return (
                                <Card key={item.image} className="shadow-lg group hover:shadow-xl transition-all p-0 rounded-lg relative"
                                >
                                    <CardContent className="p-2 bg-background border-1 border-dashed border-gray-800 relative">
                                        <div className="aspect-square transition-transform bg-muted hover:scale-3d rounded-lg overflow-hidden mb-4 relative">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.sourceType}
                                                className="w-full h-full object-cover "
                                            />
                                        </div>
                                        <div className="space-y-2 relative">
                                            <div className="flex items-center justify-between text-white absolute top-0 right-2 ">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 text-white gradient-accent border-0 shadow-lg">
                                                        <DropdownMenuItem>
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => context?.deleteUserHistory?.(item.image)}      className="text-destructive">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className={`w-4 h-4 rounded bg-gradient-to-br ${getToolColor(item.sourceType)} flex items-center justify-center`}
                                                >
                                                    <ToolIcon className="w-2.5 h-2.5 text-white" />
                                                </div>
                                                <span className="text-xs font-semibold text-muted-foreground">{item.sourceType}</span>
                                            </div>
                                            
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <Card className="border-0 shadow-lg bg-background text-white">
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {filteredItems?.map((item) => {
                                    const ToolIcon = getToolIcon(item.sourceType)
                                    return (
                                        <div key={item.id} className="p-4 hover:bg-primary/20 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.sourceType}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <div
                                                            className={`w-4 h-4 rounded bg-gradient-to-br ${getToolColor(item.sourceType)} flex items-center justify-center`}
                                                        >
                                                            <ToolIcon className="w-2.5 h-2.5 text-white" />
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">{item.sourceType}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                                                        <span>{item.imageType}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="outline" size="sm">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}


// TODO: Download functionality