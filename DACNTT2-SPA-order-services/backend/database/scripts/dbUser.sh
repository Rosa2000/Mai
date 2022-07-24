#!/bin/bash
mkdir ../databases
sqlite3 ../databases/db.sqlite3 <<EOF
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phoneNum VARCHAR(11),
    password TEXT,
    avatar TEXT,
    fullName TEXT,
    role TEXT
);

EOF

node ./makeAdminAccount.mjs