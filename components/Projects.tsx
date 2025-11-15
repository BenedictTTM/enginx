'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Scrum Master Portfolio',
    tags: ['Next.js', 'Tailwind CSS'],
    description:
      'An interactive educational platform designed to teach students the fundamentals of web development and coding. Built with modern technologies, it features comprehensive tutorials, hands-on coding exercises, and real-time progress tracking to help aspiring developers master their skills.',
    image: '/scrum.png',
    link: '#',
    color: 'bg-gray-800',
  },
  {
    id: 2,
    title: 'MyPlug Campus E-Commerce',
    tags: ['Next.js', 'Nest.js', 'Node.js'],
    description:
      'A scalable campus-based marketplace enabling students to buy and sell products seamlessly within their university community. Features secure payments, inventory management, multi-vendor support, and real-time notifications, all built with a robust full-stack architecture for optimal performance.',
    image: '/myplug.png',
    link: '#',
    color: 'bg-gray-800',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="font-varela-round bg-[#0F1E46] md:py-17 sm:py-6 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-5xl font-bold mb-2">Featured Projects</h2>
          <p className=" max-w-2xl mx-auto  font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
            Explore our portfolio of modern, scalable web applications built with cutting-edge technologies.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative  ${project.color} backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-[1.01]`}
            >
              {/* Project Image/Mockup */}
              <div className="relative h-56 sm:h-72 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="max-w-full max-h-full object-contain object-center group-hover:scale-101 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-0.5 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-200 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3 text-sm">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 font-medium transition-colors group/link text-sm"
                >
                  <span>View Live Site</span>
                  <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-400/10 to-transparent blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-6">
       
        </div>
      </div>
    </section>
  );
}
