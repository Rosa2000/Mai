sqlite3 ../databases/db.sqlite3 <<EOF
CREATE TABLE IF NOT EXISTS orders (
    orderID TEXT PRIMARY KEY,
    date_of_payment INT,
    customer_phone VARCHAR(11),
    SKU  NVARCHAR(15),
    quantity INT,
    amount INT
)
EOF