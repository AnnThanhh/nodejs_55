<!-- build image  -->

docker build -t img-gateway .

<!-- list tất cả image -->

docker image list

<!-- xóa image  -->

docker image remove img-gateway

<!-- chạy docker  -->
<!-- docker run --name con-gateway -d -p 3070:3069 img-gateway -->

docker run --name con-gateway -d -p 3070:3069 --env-file .env img-gateway

docker run --name con-gateway -d -p 3070:3069 --env-file .env.production img-gateway

<!-- truy cập vào terminal của container -->

docker exec -it con-gateway sh

<!-- coi log của container -->

docker logs con-gateway

<!-- liệt kê danh sách container trong docker  -->

docker ps

<!-- liệt kê danh sách container trong docker kể cả các container không hoạt động  -->

docker ps -a

<!-- xóa container -->

docker container remove con-gateway

<!-- restart container  -->

docker container restart con-gateway

<!-- docker compose  -->

docker compose up -d

<!-- xóa docker compose  -->

docker compose down
