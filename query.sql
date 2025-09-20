CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,          
    username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL UNIQUE,   
    password_hash TEXT NOT NULL,          
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')), 
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE features (
    feature_id SERIAL PRIMARY KEY, 
    feature_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,                         
    parent_id INT REFERENCES features(feature_id) ON DELETE CASCADE, 
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_features (
    user_feature_id SERIAL PRIMARY KEY,
    consumer_id INT NOT NULL REFERENCES consumer(consumer_id) ON DELETE CASCADE,
    feature_id INT NOT NULL REFERENCES features(feature_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, feature_id) 
);
