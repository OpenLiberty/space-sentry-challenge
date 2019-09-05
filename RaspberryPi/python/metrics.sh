#!/bin/bash
curl -H "Accept: application/json" 'http://192.168.0.104:9082/metrics' > metrics.json
