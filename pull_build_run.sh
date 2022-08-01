#!/bin/bash

git pull origin early-return
sudo ./dev build short
cd certs
sudo rm -rf cockroach-data/
sudo ./node_$1_start.sh
