#!/bin/bash
# Create case-insensitive symlinks for components that might be referenced with different casing

# Navigate to the components directory
# cd components

# Create lowercase symlinks for all files with uppercase characters
# for file in *.tsx; do
#   lowercase=$(echo "$file" | tr '[:upper:]' '[:lower:]')
#   if [ "$file" != "$lowercase" ]; then
#     echo "Creating symlink: $lowercase -> $file"
#     ln -sf "$file" "$lowercase"
#   fi
# done

# echo "Symlink creation complete"