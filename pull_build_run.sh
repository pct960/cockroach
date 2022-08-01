#!/bin/bash

git pull origin early-return
sudo ./dev build short
cd certs
sudo rm -rf cockroach-data/
sudo ./node_1_start.sh
