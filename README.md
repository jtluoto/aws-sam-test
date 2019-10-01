# AWS SAM test
A small test on AWS SAM. Creates a simple Lambda REST API and a DynamoDB table.

1. Create a bucket
````
aws s3 mb s3://<bucket name>
````
2. Package the template
````
aws --region us-east-1 cloudformation package --template-file template.yml --s3-bucket <bucket name> --output-template-file packaged-template.yml
````
3. Deploy
````
aws --region us-east-1 cloudformation deploy --template-file packaged-template.yml --stack-name aws-sam-test --capabilities CAPABILITY_IAM
````
4. Delete the stack
````
aws --region us-east-1 cloudformation delete-stack --stack-name aws-sam-test
````
