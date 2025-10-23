#!/bin/bash

# start browser before the server (async)
open http://localhost:5678/

echo "$(dirname "$0")/"
pwd

# pass control to php:
php -S localhost:5678
