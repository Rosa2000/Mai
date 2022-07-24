sqlite3 ../databases/db.sqlite3 <<EOF
CREATE TABLE IF NOT EXISTS services (
    service_ID NVARCHAR(15) PRIMARY KEY,
    serviceName TEXT,
    category TEXT,
    price INT,
    duration INT,
    description TEXT
)
EOF