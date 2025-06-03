#!/bin/bash

echo "Testing GraphQL Schema Generation..."

# Run the codegen command
yarn codegen

# Check if schema.json was generated
if [ -f "./schema.json" ]; then
  echo "Success: schema.json was generated!"
  echo "File size: $(du -h ./schema.json | cut -f1)"
else
  echo "Error: schema.json was not generated!"
fi

echo "Done!"