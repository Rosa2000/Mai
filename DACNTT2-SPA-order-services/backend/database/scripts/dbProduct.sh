sqlite3 ../databases/db.sqlite3 <<EOF
CREATE TABLE IF NOT EXISTS products (
    SKU NVARCHAR(15) PRIMARY KEY,
    productName TEXT,
    inStockValue INTEGER,
    entryPrice INTEGER,
    salePrice INTEGER,
    description TEXT,
    brand TEXT,
    category TEXT,
    URL_IMG TEXT,
    user_manual TEXT
)
EOF