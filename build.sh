#!/bin/bash
docker build -t bckjob_worker:0.1.0 -f Dockerfile ./worker
docker build -t bckjob_server:0.1.0 -f Dockerfile ./server

kubectl apply -f k8s
kubectl apply -f k8s/server
kubectl apply -f k8s/worker