# ${1}: environment: (staging, production)
# ${2}: nome_aplicacao: (app-vendedor, frontend)

aws s3 sync ./build/static s3://app-vendedor-static-assets/${1}/${2}/static --acl public-read;
