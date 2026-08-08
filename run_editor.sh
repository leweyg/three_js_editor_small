#!/bin/bash

# start browser before the server (async)
open http://localhost:5678/three_js_editor_small/

echo "$(dirname "$0")/"
pwd

# /Users/leweyg/localfs/gits/three_js_editor_small/run_editor.sh

cd ~/localfs/gits/

# pass control to php:
php -S localhost:5678
