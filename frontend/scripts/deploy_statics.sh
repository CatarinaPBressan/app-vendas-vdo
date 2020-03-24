# ${1}: environment: (staging, production)

aws s3 sync ./build/static s3://vdo-app-vendas-static-assets/${1}/frontend/static --acl public-read;
