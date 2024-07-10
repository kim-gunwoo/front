
# cd ./packages/web-app

# docker 

# docker build . -t app

# docker build -t app  -f packages/web-app/dockerfile .

# docker run --name run-app -p 4200:80 app

docker build . --target web-app --tag web-app:latest
