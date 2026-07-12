<!-- LƯU Ý: CHỈ DÙNG CHO KHI BUILD MÁY MAC -->

--platform linux/amd64

<!-- build image  -->

docker build -t img-gateway .
docker build -t tathanh26/img-gateway .
docker build --platform linux/amd64 -t tathanh26/img-gateway .
docker build --platform linux/amd64 -t tathanh26/img-order .
docker build --platform linux/amd64 -t tathanh26/img-email .

<!-- list tất cả image -->

docker image list

<!-- xóa image  -->

docker image remove img-gateway
docker image remove tathanh26/img-gateway

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

<!-- logic docker  -->

docker login

<!-- push image lên docker hub -->
<!-- tên image: taiKhoan_docker/ten_image:version -->
<!-- đăng thành công docker trên terminal  -->

docker push tathanh26/img-gateway:latest
docker push tathanh26/img-order:latest
docker push tathanh26/img-email:latest

<!-- lệnh linux  -->

mkdir nestjs: tạo folder tên nestjs

nano .env: tạo file tên .env
ctrl+O : save dữ liệu trong nano
enter: để xác nhận save
ctrl+X: thoát

ctrl+K: xóa từng dòng

<!-- liệt kê các container đang chạy  -->
docker container list
docker ps

<!-- liệt các container đang chạy và dừng (tất cả) -->
docker container list -a
docker ps -

<!-- kiểm tra action ở terminal server linux -->
sudo ./svc.sh install
sudo ./svc.sh start