#!/bin/bash

docker build -t diobis-bot . && docker run -p 3000:3000 diobis-bot
