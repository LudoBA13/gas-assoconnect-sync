#!/bin/bash

# Configuration
SOURCE_DIR="external/gas-sheet-patcher/src"
OUTPUT_FILE="src/SheetPatcher.js"

# Ensure output file is clean
echo "// Auto-generated file. Do not edit directly." > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find all .js files that do not start with '_'
# Using -maxdepth 1 assuming the relevant files are in the root of the src dir
find "$SOURCE_DIR" -maxdepth 1 -name "*.js" ! -name "_*" -type f | while read -r file; do
    echo "Appending $file..."
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\n" >> "$OUTPUT_FILE"
done

echo "Bundling complete: $OUTPUT_FILE"
