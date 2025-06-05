
-- Insert admin user
INSERT INTO user (username, email, password, role) VALUES 
('admin', 'admin@example.com', 'admin123', 'ADMIN');

-- Insert regular user
INSERT INTO user (username, email, password, role) VALUES 
('Boutine', 'user1@example.com', 'admin123', 'USER'),
('Mohamed', 'user2@example.com', 'admin123', 'USER'),
('alice', 'alice@example.com', 'admin123', 'USER'),
('bob', 'bob@example.com', 'admin123', 'USER'),
('charlie', 'charlie@example.com', 'admin123', 'USER'),
('diana', 'diana@example.com', 'admin123', 'USER');

-- Insert dummy tasks
INSERT INTO task (title, description, status, assigned_to, created_by, created_at, updated_at) VALUES 
('Complete project', 'Finish the task management system', 'IN_PROGRESS', 2, 1, NOW(), NOW()),
('Fix login bug', 'Resolve issue with user login credentials', 'TODO', 3, 1, NOW(), NOW()),
('Design dashboard UI', 'Create the layout and color scheme', 'DONE', 4, 2, NOW(), NOW()),
('Write unit tests', 'Add tests for user and task services', 'IN_PROGRESS', 2, 2, NOW(), NOW()),
('Deploy to staging', 'Push latest build to staging server', 'TODO', 1, 1, NOW(), NOW()),
('Set up CI/CD', 'Configure Jenkins and GitHub Actions', 'IN_PROGRESS', 1, 1, NOW(), NOW()),
('Create API documentation', 'Write Swagger/OpenAPI specs', 'DONE', 5, 3, NOW(), NOW()),
('Refactor backend code', 'Improve code structure and readability', 'IN_PROGRESS', 3, 2, NOW(), NOW()),
('Optimize database queries', 'Fix N+1 query problem in tasks', 'TODO', 4, 1, NOW(), NOW()),
('Research WebSocket support', 'Explore real-time updates for tasks', 'TODO', 2, 1, NOW(), NOW());
