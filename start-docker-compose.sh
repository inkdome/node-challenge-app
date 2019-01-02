#!/bin/bash

case "$1" in
--help)
  printf "\nUsage:  ./start-docker-compose.sh [OPTION]\n\nStart docker containers\n\nOptions:\n  update    re-build images\n\n"
  ;;
"")
  docker-compose up -d
  ;;
update)
  docker-compose up --build -d
  ;;
*)
  printf "\nUnknown option '$1'\nRun './start-docker-compose.sh --help' for more information\n\n"
  ;;
esac