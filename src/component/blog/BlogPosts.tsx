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
    <section id="blog" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Blog Posts
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
             <span className="bg-black text-white font-serif font-bold px-1.5 py-0.5 rounded text-xs">M</span>
             <span className="text-sm font-medium">Read my articles on Medium</span>
          </div>
        </motion.div>

        <div className="relative">
            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-all duration-300 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 hidden md:flex items-center justify-center"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-all duration-300 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 hidden md:flex items-center justify-center"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % BLOG_POSTS.length;
                const post = BLOG_POSTS[index];
                return (
                <motion.div
                    key={`${index}-${offset}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: offset * 0.1 }}
                    className="h-full"
                >
                    <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#11112b] flex flex-col rounded-2xl">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            
                            <CardContent className="flex-grow p-6 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                    <span>{post.date.split(' ')[2]}</span>
                                    <span>•</span>
                                    <span>{post.readTime || "5 min read"}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.description}
                                </p>

                                <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-bold mt-auto group/link">
                                    Read more 
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
                );
            })}
            </div>
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="rounded-full px-8 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white border-0 shadow-lg transition-all hover:scale-105 font-medium">
            <Link href="https://medium.com/@pramudithakudagamage13" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
             <span className="bg-white text-black dark:bg-black dark:text-white font-serif font-bold px-1.5 py-0.5 rounded text-xs leading-none">M</span>
               <span>View All Articles</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
