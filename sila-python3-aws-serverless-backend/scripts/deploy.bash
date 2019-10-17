#! /bin/bash

# Author: Serverless Guru
# Example usage: bash ./scripts/build.bash dev us-west-2 default

# Variables
stage=$1
region=$2
profile=$3

# Default stage if not passed
if [[ -z $stage ]];
then
    stage="dev"
fi

# Default region if not passed
if [[ -z $region ]];
then
    region="us-west-2"
fi

# Default AWS profile if not passed
if [[ -z $profile ]];
then
    region="default"
fi

echo "Deploying to S3 in $stage and $region with AWS profile called $profile"

# Extra debug logs
export SLS_DEBUG="*"

# Deploy to S3
serverless deploy --region $region --stage $stage --profile $profile -v