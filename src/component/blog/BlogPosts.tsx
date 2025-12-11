"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/Portfolio";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function BlogPosts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BLOG_POSTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + BLOG_POSTS.length) % BLOG_POSTS.length);
  };

  // For mobile/tablet, we might want to show 1 card. For desktop, maybe 2 or 3.
  // The design shows a carousel-like structure. Let's implement a simple carousel or grid.
  // Based on the image, it looks like a carousel with navigation buttons.

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Blog Posts
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
             {/* Medium Icon placeholder or use an image */}
             <span className="bg-white text-black font-serif font-bold px-1 rounded text-sm">M</span>
             <span>Read my articles on Medium</span>
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 z-10 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors hidden md:block"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 z-10 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors hidden md:block"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* We'll show 3 cards at a time for desktop */}
            {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % BLOG_POSTS.length;
                const post = BLOG_POSTS[index];
                return (
                <motion.div
                    key={`${index}-${offset}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                >
                    <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <Card className="h-full overflow-hidden border-0 bg-[#11112b] text-white hover:border-indigo-500/50 border border-transparent transition-all duration-300 group flex flex-col rounded-xl min-h-[420px]">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#11112b] to-transparent opacity-60" />
                            </div>
                            
                            <CardContent className="flex-grow p-6 pt-4">
                                <div className="flex justify-between items-start mb-4 text-sm text-gray-400">
                                    <div className="flex gap-2">
                                        <span>{post.date.split(' ')[2]}</span> {/* Year */}
                                        <span>•</span>
                                        <span>{post.readTime || "5 min read"}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                    {post.description}
                                </p>

                                <div className="flex items-center text-indigo-400 text-sm font-medium mt-auto">
                                    Read more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
                );
            })}
            </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105">
            <Link href="https://medium.com/@pramudithakudagamage13" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
             <span className="bg-white text-black font-serif font-bold px-1.5 py-0.5 rounded text-sm leading-none">M</span>
               <span>View All Articles</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
