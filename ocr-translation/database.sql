-- Create database
CREATE DATABASE IF NOT EXISTS ocr_translation;
USE ocr_translation;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    avatar VARCHAR(255),
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create manga table
CREATE TABLE IF NOT EXISTS manga (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) NOT NULL,
    description TEXT,
    author VARCHAR(255),
    artist VARCHAR(255),
    publisher VARCHAR(255),
    status VARCHAR(50),
    genres JSON,
    cover_image VARCHAR(255),
    source_language VARCHAR(50),
    target_languages JSON,
    metadata JSON,
    translation JSON,
    view_count INT DEFAULT 0,
    favorite_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create chapter table
CREATE TABLE IF NOT EXISTS chapter (
    id VARCHAR(36) PRIMARY KEY,
    manga_id VARCHAR(36) NOT NULL,
    chapter_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) NOT NULL,
    description TEXT,
    page_urls JSON,
    status VARCHAR(50),
    source_language VARCHAR(50),
    target_languages JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
);

-- Create translation table
CREATE TABLE IF NOT EXISTS translation (
    id VARCHAR(36) PRIMARY KEY,
    chapter_id VARCHAR(36) NOT NULL,
    translator_id VARCHAR(36) NOT NULL,
    language VARCHAR(50) NOT NULL,
    content JSON NOT NULL,
    status VARCHAR(50),
    reviewer_id VARCHAR(36),
    review_notes TEXT,
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (chapter_id) REFERENCES chapter(id) ON DELETE CASCADE,
    FOREIGN KEY (translator_id) REFERENCES users(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- Insert initial admin user
-- Password: password123 (hashed)
INSERT INTO users (id, email, username, password, roles, is_active)
VALUES (
    UUID(),
    'admin@example.com',
    'admin',
    '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu.Vm',
    '["ADMIN"]',
    TRUE
); 

-- Bảng chính: categories
CREATE TABLE IF NOT EXISTS categories (
  id CHAR(36) PRIMARY KEY, -- UUID dạng string (CHAR(36))
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng trung gian: manga_categories
CREATE TABLE IF NOT EXISTS manga_categories (
  category_id CHAR(36) NOT NULL,
  manga_id CHAR(36) NOT NULL,
  PRIMARY KEY (category_id, manga_id),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
);
