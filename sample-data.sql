-- Sample Data for Admin Panel Testing
-- Run this SQL in your Supabase SQL editor

-- Add sample community events
INSERT INTO public.community_events (title, description, event_type, event_date, event_time, location, is_featured, max_attendees) VALUES 
('AI Strategy Workshop', 'Learn how to develop and implement AI strategies for your business', 'workshop', '2024-02-15 10:00:00+00', '10:00 AM - 12:00 PM EST', 'Virtual Event', true, 50),
('Community Q&A Session', 'Get your AI questions answered by our expert team', 'q&a', '2024-02-20 15:00:00+00', '3:00 PM - 4:00 PM EST', 'Virtual Event', false, 100),
('AI Implementation Showcase', 'See real-world AI implementations and their results', 'showcase', '2024-02-25 14:00:00+00', '2:00 PM - 4:00 PM EST', 'Virtual Event', true, 75);

-- Add sample community resources
INSERT INTO public.community_resources (title, description, resource_type, file_url, is_premium) VALUES 
('AI Strategy Framework Template', 'Complete framework for developing your AI strategy from ideation to implementation', 'template', 'https://example.com/ai-strategy-template.pdf', false),
('AI ROI Calculator', 'Excel-based calculator to measure and project AI project returns', 'tool', 'https://example.com/ai-roi-calculator.xlsx', false),
('Advanced AI Prompts Library', '500+ tested prompts for business applications across all industries', 'library', 'https://example.com/ai-prompts-library.pdf', true),
('AI Ethics & Compliance Guide', 'Complete guide to implementing AI responsibly in your organization', 'guide', 'https://example.com/ai-ethics-guide.pdf', true),
('AI Team Training Materials', 'Ready-to-use training materials for upskilling your team on AI', 'training', 'https://example.com/ai-training-materials.zip', false);
