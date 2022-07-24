#!/bin/sh
./dbUser.sh
echo "CREATED USER DATABASE"
./dbProduct.sh
echo "CREATED PRODUCT DATABASE"
./dbOrders.sh
echo "CREATED ORDER DATABASE"
./dbServices.sh
echo "CREATED SERVICES DATABASE"