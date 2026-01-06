import { useEffect } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
import { ICON_SIZES } from '../constants/design-system';

interface Project {
  title: string;
  client: string;
  url: string;
  description: string;
  type: string;
}

const CaseStudies = () => {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Green Exam",
      client: "Offee",
      url: "https://greenexam.in/",
      description: "A comprehensive online examination platform designed to streamline the testing and assessment process for educational institutions and organizations.",
      type: "Website Development"
    },
    {
      title: "PLAT SKILL",
      client: "Offee",
      url: "https://platskills.com/",
      description: "An innovative skills platform that connects learners with opportunities to develop and showcase their professional capabilities.",
      type: "Website Development"
    },
    {
      title: "OFFEE.in",
      client: "Offee",
      url: "https://offee.in/",
      description: "A modern, responsive website that showcases Offee's services and provides an engaging user experience for their clients.",
      type: "Website Development"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-purple-950/20" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" aria-hidden="true"></div>
        <div className="relative modern-container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading level={1} align="center" className="mb-3 sm:mb-4">
              Our Work
            </Heading>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Explore the projects we've built and the solutions we've delivered for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Section background="primary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="fade-in-on-scroll group h-full flex flex-col" padding="md">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-blue-200/20 text-blue-300 text-xs sm:text-sm font-semibold rounded-lg mb-2 sm:mb-3">
                      {project.type}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                      Client: <span className="text-gray-300 font-semibold">{project.client}</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-3">
                    <Globe className={`${ICON_SIZES.md} text-white`} aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 w-full"
                  aria-label={`Visit ${project.title} website`}
                >
                  Visit Website
                  <ExternalLink className={`ml-2 ${ICON_SIZES.sm}`} aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CaseStudies;

