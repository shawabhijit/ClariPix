import { Award, Quote, Star, ThumbsUp, TrendingUp, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Graphic Designer",
            avatar: "https://imgs.search.brave.com/lSuUiq0JXqFPA8kk2NTxGnhQH8jTOikYqhldRFhItFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTky/OTAyODQvcGhvdG8v/Y2FubmVzLWZyYW5j/ZS1hY3RyZXNzLWRv/LXllb24tamVvbi1h/dHRlbmRzLXRoZS1o/b3VzZW1haWQtcGhv/dG8tY2FsbC1oZWxk/LWF0LXRoZS1wYWxh/aXMtZGVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1RMWlO/UHJFR1lSYWNTc1lt/dF9qNzA4SnBId0pw/aDVLZkxsaktxTFpl/Ykk4PQ",
            rating: 5,
            date: "2 days ago",
            review:
                "This tool has revolutionized my workflow! The background removal is incredibly accurate, and the AI enhancement feature saved me hours of manual editing. Highly recommend for any creative professional.",
            likes: 24,
            verified: true,
        },
        {
            id: 2,
            name: "Mike Chen",
            role: "E-commerce Owner",
            avatar: "https://imgs.search.brave.com/iR3syPV1HzSl-cNBaLztBJ964-eVYRIcEwaSCcUdYOk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1qQXlNREkw/TkRJNE0xNUJNbDVC/YW5CblhrRnRaVGN3/TkRrM09UZ3dNd0BA/Ll9WMV9RTDc1X1VY/NDEwXy5qcGc",
            rating: 5,
            date: "1 week ago",
            review:
                "Perfect for product photography! I can now create professional-looking product images without hiring a photographer. The object removal feature is a game-changer for my online store.",
            likes: 18,
            verified: true,
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Social Media Manager",
            avatar: "https://imgs.search.brave.com/QN58SEHhvN-KHJXRIAbseSJDAlLKsc8K1x1C8bQnxcg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2RyYW1hbG92ZS5j/b20vZ2FsbGVyaWVz/L3Jlc3RtYl9qaGlk/eG1ha2UuanBn",
            rating: 5,
            date: "2 weeks ago",
            review:
                "Amazing results every time! The resolution enhancement feature makes my old photos look brand new. The interface is intuitive and the processing speed is impressive.",
            likes: 31,
            verified: true,
        },
        {
            id: 4,
            name: "David Thompson",
            role: "Photographer",
            avatar: "https://imgs.search.brave.com/LLqz1UIB0EeZ4gQyfFChWZ4UH8RB-uXyXNtik6RHvkY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vYm93aWUxNS9i/b3dpZTE1MTcwMi9i/b3dpZTE1MTcwMjAy/MTA3LzczNDUxMTY4/LWEtYnVzaW5lc3Nt/YW4taXMtYWJvdXQt/dG8tY3J5LmpwZz92/ZXI9Ng",
            rating: 4,
            date: "3 weeks ago",
            review:
                "Great tool for quick edits and client previews. The AI is surprisingly accurate, though I still prefer manual editing for my final deliverables. Excellent value for the price.",
            likes: 15,
            verified: true,
        },
        {
            id: 5,
            name: "Lisa Park",
            role: "Marketing Director",
            avatar: "https://imgs.search.brave.com/jbJzpi8Jo9FZPlv2QVKN9aJTCabDh5mMz9EGJ_CJY5I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIx/MzYyODc2L3Bob3Rv/L3N5ZG5leS1hdXN0/cmFsaWEtYnJpdGlz/aC1zaW5nZXItZGlk/by1pbi10aGUtYXdh/cmRzLXJvb20tYmFj/a3N0YWdlLWF0LXRo/ZS0xNXRoLWFubnVh/bC1hcmlhLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NNmZr/N2d0MW5HU3FyaUdY/TEpnUjBEbkFMXzJ5/dEFuSE5raEFfQWxm/RWk0PQ",
            rating: 5,
            date: "1 month ago",
            review:
                "Our entire marketing team uses this now. The batch processing feature saves us so much time, and the quality is consistently high. Customer support is also excellent!",
            likes: 42,
            verified: true,
        },
        {
            id: 6,
            name: "James Wilson",
            role: "Content Creator",
            avatar: "https://imgs.search.brave.com/1m25dsW9cCQEn7xwZqmD97HaqBpMxAoeLWcKMJp7g_M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI5/MDM2OTY5Ni9waG90/by9yZWQtc294LWNv/LWdtLWplZC1ob3ll/ci10aGUtYmFzZWJh/bGwtd3JpdGVycy1t/ZWV0LWFuZC1ncmVl/dC1hdC10aGUtbWFy/cmlvdHQtbG9uZy13/aGFyZi1ob3RlbC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/WmxqTENGX3o2MHJw/MDd6YTdwUENuYTBL/SjBvV1lBMGVCRC14/VnBEWjBDRT0",
            rating: 5,
            date: "1 month ago",
            review:
                "This is exactly what I needed for my YouTube thumbnails and social media content. The background change feature with preset options is fantastic. Worth every penny!",
            likes: 28,
            verified: true,
        },
    ]

    const stats = [
        { icon: Users, label: "Total Users", value: "10,000+" },
        { icon: Star, label: "Average Rating", value: "4.9/5" },
        { icon: Award, label: "5-Star Reviews", value: "94%" },
        { icon: TrendingUp, label: "User Growth", value: "+150%" },
    ]

    return (
        <section className="relative overflow-hidden">
            <div className="container px-4 mx-auto max-w-7xl text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Badge variant="secondary" className="w-fit mx-auto">
                        <Star className="w-3 h-3 mr-1" />
                        User Reviews
                    </Badge>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold">
                        What Our Users{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Are Saying
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Join thousands of satisfied users who have transformed their image editing workflow with our AI-powered
                        tools.
                    </p>
                </div>
            </div>


            {/* Stats Section */}
            <div className="container relative px-4 mx-auto max-w-7xl py-26">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="group border-0 bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer text-center p-6">
                                <CardContent className="pt-2 text-center space-y-2">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="container px-4 mx-auto max-w-7xl py-15">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reviews.map((review) => (
                        <Card key={review.id} className="border-0 bg-secondary/15 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={review.avatar || "/placeholder.svg"}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{review.name}</h3>
                                                {review.verified && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.role}</p>
                                        </div>
                                    </div>
                                    <Quote className="w-5 h-5 text-emerald-500 opacity-50" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-sm leading-relaxed">{review.review}</p>

                                <div className="flex items-center justify-between pt-2 border-t">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-emerald-600">
                                        <ThumbsUp className="w-4 h-4 mr-1" />
                                        {review.likes}
                                    </Button>
                                    <span className="text-xs text-muted-foreground">Helpful</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Reviews