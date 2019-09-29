-- CREATE DATABASE craigList;

CREATE TABLE jobPost (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  datePosted TIMESTAMP,
  neighbourhood VARCHAR(200),
  url TEXT NOT NULL,
  jobDescription TEXT,
  compensation VARCHAR(64)
);

DESCRIBE craiglist.jobpost;