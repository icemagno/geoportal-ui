docker run --name angular-runner -v D:/Projetos/novo-geoportal:/usr/src/app -p 4200:4200 -p 4200:4200 -it angular-runner

docker exec -it angular-runner /bin/sh

ng serve --host 0.0.0.0 --configuration development --poll=2000 --disable-host-check