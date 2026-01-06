import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Heading from '../components/ui/Heading';
import { ICON_SIZES } from '../constants/design-system';

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  impact: string;
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

  const caseStudies: CaseStudy[] = [
    {
      title: "E-commerce Automation Platform",
      problem: "A mid-size e-commerce company was struggling with manual order processing, leading to delays and customer complaints. They needed to automate their workflow without disrupting operations.",
      solution: "AIdea Digital designed and implemented an AI-powered workflow automation system that integrated with their existing CRM and inventory management systems. We built a custom solution using AI models to predict demand, automate order routing, and handle customer inquiries.",
      impact: "Reduced order processing time by 75%, cut operational costs by $120K annually, and improved customer satisfaction scores by 40%."
    },
    {
      title: "Healthcare Data Analysis MVP",
      problem: "A healthcare startup had an idea for an AI-powered diagnostic tool but wasn't sure if it was feasible. They needed validation before investing significant resources.",
      solution: "We developed a functional mock solution (PoC) that demonstrated the core AI capabilities. The mock included a working prototype that could analyze medical images and provide preliminary insights, allowing stakeholders to experience the solution firsthand.",
      impact: "Validated the concept in 6 weeks, secured $2M in funding based on the demo, and launched the MVP 3 months later with early adopter hospitals."
    },
    {
      title: "Financial Services Chatbot",
      problem: "A financial services SME was overwhelmed with customer support inquiries, leading to long wait times and frustrated customers. They needed a scalable solution that could handle common queries 24/7.",
      solution: "AIdea Digital built an AI voice bot integrated with their customer service system. The solution could handle account inquiries, transaction history, and basic troubleshooting in multiple languages.",
      impact: "Handled 60% of customer inquiries automatically, reduced support costs by $80K per year, and improved average response time from 15 minutes to instant."
    },
    {
      title: "Manufacturing Quality Control System",
      problem: "A manufacturing enterprise was experiencing high defect rates and quality control bottlenecks. Manual inspection processes were slow and inconsistent, affecting production timelines.",
      solution: "We implemented an AI-powered computer vision system that automatically detects defects in real-time during production. The solution integrates with their existing production line and provides instant alerts for quality issues.",
      impact: "Reduced defect rates by 50%, improved production efficiency by 30%, and saved $200K annually in quality control costs."
    },
    {
      title: "Retail Inventory Optimization",
      problem: "A retail chain was struggling with inventory management across multiple locations, leading to stockouts and overstock situations that impacted revenue.",
      solution: "AIdea Digital developed an AI-driven inventory optimization platform that predicts demand patterns, optimizes stock levels across locations, and automates reordering processes based on real-time sales data.",
      impact: "Reduced inventory costs by 25%, eliminated stockouts in high-demand products, and increased revenue by $150K through better inventory management."
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
              Case Studies
            </Heading>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Real problems, practical solutions, measurable impact. See how we've helped businesses transform their operations with AI.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <Section background="primary">
        <div className="modern-container px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="fade-in-on-scroll group" padding="md sm:lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 glow-blue" aria-label={`Case Study ${index + 1}`}>
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                    <Card variant="bordered" className="border-blue-500" padding="sm sm:md">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-400 mb-2 sm:mb-3 flex items-center">
                        <CheckCircle className={`${ICON_SIZES.sm} sm:${ICON_SIZES.md} mr-2 text-blue-400`} aria-hidden="true" />
                        Problem
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                        {study.problem}
                      </p>
                    </Card>
                    <Card variant="bordered" className="border-purple-500" padding="sm sm:md">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-purple-400 mb-2 sm:mb-3 flex items-center">
                        <CheckCircle className={`${ICON_SIZES.sm} sm:${ICON_SIZES.md} mr-2 text-purple-400`} aria-hidden="true" />
                        Solution
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                        {study.solution}
                      </p>
                    </Card>
                    <Card variant="bordered" className="border-green-500" padding="sm sm:md">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-green-400 mb-2 sm:mb-3 flex items-center">
                        <CheckCircle className={`${ICON_SIZES.sm} sm:${ICON_SIZES.md} mr-2 text-green-400`} aria-hidden="true" />
                        Impact
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-200 font-semibold leading-relaxed">
                        {study.impact}
                      </p>
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CaseStudies;

