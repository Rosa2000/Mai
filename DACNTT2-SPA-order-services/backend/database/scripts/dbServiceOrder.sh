sqlite3 ../databases/db.sqlite3 <<EOF
CREATE TABLE IF NOT EXISTS service_order (
    orderID TEXT PRIMARY KEY,
    date_booking INT,
    customer_phone VARCHAR(11),
    selected_services_ID  NVARCHAR(15),
    amount INT
)
EOF