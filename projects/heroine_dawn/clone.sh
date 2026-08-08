#!/bin/bash

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir" || exit 1
cd ../../.. || exit 1

if [ ! -d heroine_dawn ]; then
	git clone https://github.com/leweyg/heroine_dawn.git
fi

open http://localhost:5678/three_js_editor_small/editor/?file_path=../../heroine_dawn/web/models/map_1.json
