#!/bin/bash

echo "Testing GraphQL Code Generation..."
yarn codegen

echo "Checking if files were generated..."
ls -la app/graphql/

echo "Done!"