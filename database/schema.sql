-- PostgreSQL DDL

CREATE TABLE projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  name  VARCHAR(255) NOT NULL,
  url VARCHAR(2048),
  description TEXT,
  in_progress BOOLEAN NOT NULL DEFAULT FALSE
  deployed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_projects_in_progress ON projects (in_progress);
CREATE INDEX idx_projects_deployed ON projects (deployed);

CREATE TABLE tag_categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tags (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category_id BIGINT NULL,
  CONSTRAINT fk_tags_category
    FOREIGN KEY (category_id) REFERENCES tag_categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_tags_category ON tags (category_id);

CREATE TABLE project_tags (
  project_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (project_id, tag_id),
  CONSTRAINT fk_project_tags_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_tags_tag
    FOREIGN KEY (tag_id) REFERENCES tags(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_project_tags_tag ON project_tags (tag_id);

CREATE TABLE project_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL,
  title VARCHAR(255),
  alt VARCHAR(255),
  path VARCHAR(2048) NOT NULL,
  CONSTRAINT fk_project_images_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_project_images_project ON project_images (project_id);

CREATE TABLE project_markdowns (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL,
  path VARCHAR(2048) NOT NULL,
  CONSTRAINT fk_project_markdowns_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_project_markdowns_project ON project_markdowns (project_id);

-- ENUM in Postgres: create type first
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_link_type') THEN
    CREATE TYPE project_link_type AS ENUM ('website', 'github');
  END IF;
END$$;

CREATE TABLE project_links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL,
  type project_link_type NOT NULL,
  value VARCHAR(2048) NOT NULL,
  CONSTRAINT fk_project_links_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_project_links_project ON project_links (project_id);
CREATE INDEX idx_project_links_type ON project_links (type);

CREATE TABLE featured_projects (
  project_id BIGINT PRIMARY KEY,
  CONSTRAINT fk_featured_projects_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
