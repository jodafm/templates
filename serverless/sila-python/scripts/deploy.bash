#! /bin/bash

stage=$1
region=$2
profile="serverlessguru" # Change this

if [[ $stage -z ]];
then
    echo "working?"
fi

# sls deploy --stage $stage --region $region --profile $profile -v