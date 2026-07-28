#!/bin/bash
# kopolab run.sh : Vite(React) 빌드 결과(dist/)를 정적 서빙
# start_server.sh 가 이 파일을 최우선으로 실행함 (반드시 $PORT + 0.0.0.0 사용)
cd "$(dirname "$0")"
# 빌드 (dist/ 생성). 실패해도 계속 진행은 하지 않음
npm run build || { echo "빌드 실패" >&2; exit 1; }
# 빌드 결과를 PORT 로 서빙
python3 -m http.server "$PORT" --bind 0.0.0.0 --directory dist
