#!/bin/bash
set -e -o pipefail
npm run lint
npm run flow
npm t -- -R tap