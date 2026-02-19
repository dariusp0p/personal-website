CREATE TABLE projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(2048) NULL,
  description TEXT NULL,
  online TINYINT(1) NOT NULL DEFAULT 0,
  KEY idx_projects_online (online) -- !!!
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tag_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_tag_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tags (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id BIGINT UNSIGNED NULL,
  UNIQUE KEY uq_tags_name (name),
  KEY idx_tags_category (category_id),
  CONSTRAINT fk_tags_category
    FOREIGN KEY (category_id) REFERENCES tag_categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_tags (
  project_id BIGINT UNSIGNED NOT NULL,
  tag_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (project_id, tag_id),
  KEY idx_project_tags_tag (tag_id),
  CONSTRAINT fk_project_tags_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_tags_tag
    FOREIGN KEY (tag_id) REFERENCES tags(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_images (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NULL,
  alt VARCHAR(255) NULL,
  path VARCHAR(2048) NOT NULL,
  KEY idx_project_images_project (project_id),
  CONSTRAINT fk_project_images_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_markdowns (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  path VARCHAR(2048) NOT NULL,
  KEY idx_project_markdowns_project (project_id),
  CONSTRAINT fk_project_markdowns_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE project_links (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id BIGINT UNSIGNED NOT NULL,
  type ENUM('website','github') NOT NULL,
  value VARCHAR(2048) NOT NULL,
  KEY idx_project_links_project (project_id),
  KEY idx_project_links_type (type),
  CONSTRAINT fk_project_links_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE featured_projects (
  project_id BIGINT UNSIGNED PRIMARY KEY,
  CONSTRAINT fk_featured_projects_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;