-- Create audio table
CREATE TABLE IF NOT EXISTS audio (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    manga_id VARCHAR(36) NOT NULL,
    start_chapter_number INT NOT NULL,
    end_chapter_number INT NOT NULL,
    file_path VARCHAR(255),
    duration INT,
    file_size INT,
    format VARCHAR(10) DEFAULT 'mp3',
    bitrate INT,
    sample_rate INT,
    channels INT DEFAULT 2,
    status ENUM('processing', 'completed', 'failed') DEFAULT 'processing',
    error_message TEXT,
    metadata LONGTEXT CHECK (JSON_VALID(metadata)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign key constraints
    CONSTRAINT fk_manga FOREIGN KEY (manga_id)
        REFERENCES manga(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create index for faster queries
CREATE INDEX idx_audio_manga_id ON audio(manga_id);
CREATE INDEX idx_audio_status ON audio(status);
CREATE INDEX idx_audio_created_at ON audio(created_at);

-- Add triggers for validation
DELIMITER //

CREATE TRIGGER before_audio_insert 
BEFORE INSERT ON audio
FOR EACH ROW
BEGIN
    -- Validate chapter numbers
    IF NEW.start_chapter_number > NEW.end_chapter_number THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Start chapter number must be less than or equal to end chapter number';
    END IF;
    
    -- Validate bitrate
    IF NEW.bitrate IS NOT NULL AND (NEW.bitrate < 32 OR NEW.bitrate > 320) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bitrate must be between 32 and 320 kbps';
    END IF;
    
    -- Validate sample rate
    IF NEW.sample_rate IS NOT NULL AND (NEW.sample_rate < 8000 OR NEW.sample_rate > 48000) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sample rate must be between 8000 and 48000 Hz';
    END IF;
    
    -- Validate channels
    IF NEW.channels IS NOT NULL AND (NEW.channels < 1 OR NEW.channels > 2) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Channels must be 1 (mono) or 2 (stereo)';
    END IF;
END//

CREATE TRIGGER before_audio_update
BEFORE UPDATE ON audio
FOR EACH ROW
BEGIN
    -- Validate chapter numbers
    IF NEW.start_chapter_number > NEW.end_chapter_number THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Start chapter number must be less than or equal to end chapter number';
    END IF;
    
    -- Validate bitrate
    IF NEW.bitrate IS NOT NULL AND (NEW.bitrate < 32 OR NEW.bitrate > 320) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bitrate must be between 32 and 320 kbps';
    END IF;
    
    -- Validate sample rate
    IF NEW.sample_rate IS NOT NULL AND (NEW.sample_rate < 8000 OR NEW.sample_rate > 48000) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sample rate must be between 8000 and 48000 Hz';
    END IF;
    
    -- Validate channels
    IF NEW.channels IS NOT NULL AND (NEW.channels < 1 OR NEW.channels > 2) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Channels must be 1 (mono) or 2 (stereo)';
    END IF;
END//

DELIMITER ; 