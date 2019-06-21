#!/bin/bash
curl -H "Accept: application/json" 'http://localhost:9080/metrics' > metrics.json
