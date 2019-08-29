#!/bin/bash
curl -H "Accept: application/json" 'http://localhost:9082/metrics' > metrics.json
