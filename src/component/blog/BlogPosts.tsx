"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/Portfolio";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type BlogPost = {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  link: string;
  image: string;
  tags?: string[];
};

export default function BlogPosts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        const response = await fetch("/api/blog-posts");
        if (!response.ok) return;

        const data = await response.json();
        if (!ignore && data?.ok && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          setCurrentIndex(0);
        }
      } catch {
        // Keep static fallback posts when auto-fetch fails.
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const visiblePosts = useMemo(() => {
    if (posts.length === 0) return [];
    return [0, 1, 2].map((offset) => posts[(currentIndex + offset) % posts.length]);
  }, [currentIndex, posts]);

  const nextSlide = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
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
            {visiblePosts.map((post, offset) => {
                return (
                <motion.div
                key={`${post.link}-${offset}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: offset * 0.1 }}
                    className="h-full"
                >
                    <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#11112b] flex flex-col rounded-2xl">
                            <div className="relative h-56 w-full overflow-hidden">
                                {post.image.startsWith("http") ? (
                                  <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                ) : (
                                  <Image
                                      src={post.image}
                                      alt={post.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                )}
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
