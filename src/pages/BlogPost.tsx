import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, BookOpen, TrendingUp, Shield, Lightbulb } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching blog post data
    const blogPosts = [
      {
        id: 'ai-mvp-validation',
        icon: Lightbulb,
        title: "How to validate your first AI MVP",
        excerpt: "Learn the proven framework for testing AI concepts before you invest in development. We'll show you how to validate ideas in just 2 weeks.",
        category: "Strategy",
        readTime: "8 min read",
        date: "Dec 15, 2024",
        author: "AIdea Digital Team",
        content: `
          <h2>Why AI MVP Validation Matters</h2>
          <p>In the fast-paced world of AI, jumping straight into development can be costly and time-consuming. That's why we advocate for a strategic validation approach that saves both time and resources.</p>
          
          <h3>The 2-Week Validation Framework</h3>
          <p>Our proven framework consists of four key phases:</p>
          <ol>
            <li><strong>Problem Validation (Days 1-3):</strong> Confirm that the problem you're solving is real and urgent for your target audience.</li>
            <li><strong>Solution Validation (Days 4-7):</strong> Test your proposed AI solution with potential users using low-fidelity prototypes.</li>
            <li><strong>Technical Feasibility (Days 8-10):</strong> Assess the technical requirements and potential challenges.</li>
            <li><strong>Business Model Validation (Days 11-14):</strong> Verify that your solution can generate sustainable revenue.</li>
          </ol>
          
          <h3>Key Validation Methods</h3>
          <ul>
            <li><strong>Customer Interviews:</strong> Conduct 15-20 interviews with your target audience</li>
            <li><strong>Prototype Testing:</strong> Use tools like Figma or simple demos to test user reactions</li>
            <li><strong>Technical Spikes:</strong> Build small proof-of-concepts for critical technical components</li>
            <li><strong>Market Analysis:</strong> Research competitors and market size</li>
          </ul>
          
          <h3>Common Pitfalls to Avoid</h3>
          <p>Many teams make these mistakes during validation:</p>
          <ul>
            <li>Asking leading questions that bias responses</li>
            <li>Focusing too much on features instead of problems</li>
            <li>Ignoring technical constraints early on</li>
            <li>Not validating the business model</li>
          </ul>
          
          <h3>Success Metrics</h3>
          <p>Define clear success criteria before starting validation:</p>
          <ul>
            <li>At least 70% of interviewees express strong interest</li>
            <li>Users are willing to pay for the solution</li>
            <li>Technical challenges are identified and manageable</li>
            <li>Clear path to market exists</li>
          </ul>
          
          <h2>Next Steps</h2>
          <p>Once validation is complete, you'll have a clear roadmap for development or the confidence to pivot to a better opportunity. Remember, it's better to fail fast during validation than after months of development.</p>
        `,
        tags: ["AI Strategy", "MVP", "Validation", "Product Development"],
        relatedPosts: ["gpt-strategy", "ai-roi-measurement"]
      },
      {
        id: 'gpt-strategy',
        icon: TrendingUp,
        title: "GPT isn't a strategy — Here's what is",
        excerpt: "Why most AI implementations fail and how to build a strategic approach that actually delivers business value.",
        category: "Strategy",
        readTime: "6 min read",
        date: "Dec 10, 2024",
        author: "AIdea Digital Team",
        content: `
          <h2>The GPT Hype Problem</h2>
          <p>Many businesses are rushing to implement GPT solutions without a clear strategic foundation. While GPT is a powerful tool, it's not a strategy in itself.</p>
          
          <h3>What Makes a Good AI Strategy</h3>
          <p>A successful AI strategy should address:</p>
          <ul>
            <li><strong>Business Objectives:</strong> Clear alignment with company goals</li>
            <li><strong>User Needs:</strong> Understanding of customer pain points</li>
            <li><strong>Technical Feasibility:</strong> Realistic assessment of capabilities</li>
            <li><strong>ROI Projections:</strong> Measurable business impact</li>
          </ul>
          
          <h3>Strategic Framework for AI Implementation</h3>
          <ol>
            <li><strong>Assess Current State:</strong> Evaluate existing processes and identify automation opportunities</li>
            <li><strong>Define Success Metrics:</strong> Establish KPIs that align with business objectives</li>
            <li><strong>Choose the Right Tools:</strong> Select AI solutions based on specific use cases, not trends</li>
            <li><strong>Plan for Integration:</strong> Ensure AI solutions work with existing systems</li>
            <li><strong>Prepare for Change Management:</strong> Train teams and manage adoption</li>
          </ol>
          
          <h3>Common Strategic Mistakes</h3>
          <ul>
            <li>Implementing AI without clear business objectives</li>
            <li>Focusing on technology over user experience</li>
            <li>Ignoring data quality and governance</li>
            <li>Underestimating change management requirements</li>
          </ul>
        `,
        tags: ["AI Strategy", "GPT", "Business Strategy", "Implementation"],
        relatedPosts: ["ai-mvp-validation", "ai-roi-measurement"]
      },
      {
        id: 'ai-prompts-business',
        icon: BookOpen,
        title: "10 prompts every business team should try",
        excerpt: "Ready-to-use prompts that can immediately improve your team's productivity across marketing, sales, and operations.",
        category: "Practical",
        readTime: "5 min read",
        date: "Dec 5, 2024",
        author: "AIdea Digital Team",
        content: `
          <h2>Marketing Prompts</h2>
          <h3>1. Content Calendar Generator</h3>
          <p><strong>Prompt:</strong> "Create a 30-day content calendar for [industry] with engaging topics that address [target audience] pain points. Include blog titles, social media posts, and email newsletter themes."</p>
          
          <h3>2. Customer Persona Developer</h3>
          <p><strong>Prompt:</strong> "Develop detailed customer personas for [product/service] including demographics, pain points, goals, and preferred communication channels."</p>
          
          <h2>Sales Prompts</h2>
          <h3>3. Objection Handler</h3>
          <p><strong>Prompt:</strong> "Create responses to common sales objections for [product/service] that address concerns about price, implementation time, and ROI."</p>
          
          <h3>4. Proposal Generator</h3>
          <p><strong>Prompt:</strong> "Write a professional proposal for [client type] seeking [solution] that highlights benefits, includes pricing options, and addresses their specific needs."</p>
          
          <h2>Operations Prompts</h2>
          <h3>5. Process Optimizer</h3>
          <p><strong>Prompt:</strong> "Analyze this workflow: [describe process] and suggest 5 ways to improve efficiency, reduce errors, and save time."</p>
          
          <h3>6. Meeting Agenda Creator</h3>
          <p><strong>Prompt:</strong> "Create a structured agenda for a [meeting type] meeting with [participants] focusing on [objectives]. Include time allocations and discussion points."</p>
          
          <h2>Customer Service Prompts</h2>
          <h3>7. Response Templates</h3>
          <p><strong>Prompt:</strong> "Create professional email templates for common customer service scenarios including order delays, technical issues, and refund requests."</p>
          
          <h3>8. FAQ Generator</h3>
          <p><strong>Prompt:</strong> "Generate a comprehensive FAQ section for [product/service] covering installation, troubleshooting, pricing, and support."</p>
          
          <h2>Strategy Prompts</h2>
          <h3>9. Competitive Analysis</h3>
          <p><strong>Prompt:</strong> "Analyze [competitor] and identify their strengths, weaknesses, unique selling propositions, and market positioning."</p>
          
          <h3>10. Goal Setting Framework</h3>
          <p><strong>Prompt:</strong> "Create SMART goals for [department/team] for Q1 2025, including specific metrics, timelines, and success criteria."</p>
          
          <h2>Tips for Using These Prompts</h2>
          <ul>
            <li>Customize prompts with your specific context and requirements</li>
            <li>Review and refine AI-generated content before using</li>
            <li>Combine multiple prompts for comprehensive results</li>
            <li>Save successful prompts for future use</li>
          </ul>
        `,
        tags: ["AI Prompts", "Productivity", "Business Tools", "Automation"],
        relatedPosts: ["ai-mvp-validation", "ai-ethics-101"]
      }
    ];

    const foundPost = blogPosts.find(p => p.id === id);
    setPost(foundPost || blogPosts[0]);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${post.color} rounded-full mb-6`}>
              <post.icon className="h-8 w-8 text-white" />
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                {post.category}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              By {post.author}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Share:</span>
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.relatedPosts?.map((relatedId: string, index: number) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Related Article {index + 1}
                </h3>
                <p className="text-gray-600 mb-4">
                  Brief description of the related article...
                </p>
                <Link
                  to={`/blog/${relatedId}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Apply These Insights?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Let's discuss how these strategies can be implemented in your specific business context
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Let's Connect
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost; 