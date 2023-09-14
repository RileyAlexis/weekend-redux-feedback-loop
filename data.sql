-- Database should be prime_feedback

-- Switch to "prime_feedback" before making:
-- Table to store the feedback
CREATE TABLE "feedback" (
  "id" serial primary key,
  "user_email" VARCHAR(65),
  "feeling" DECIMAL not null,
  "understanding" DECIMAL not null,
  "support" DECIMAL not null,
  "comments" text,
  "flagged" boolean default false,
  "date" date not null default CURRENT_DATE
); 

-- Sample feedback item
INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
VALUES (4, 4, 5, 'Doing Great!');


CREATE TABLE "users" (
  "email" text NOT NULL UNIQUE,
  "hashed_password" VARCHAR(255)
);
