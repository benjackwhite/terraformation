resource "random_password" "example-password" {
  length = 32
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "terraformation-example-lambda-${terraform.workspace}"
  description   = "My example lambda function"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"

  source_path = "${path.module}/files/lambda"

  environment_variables = {
    "SUPER_SECRET_PASSWORD" = random_password.example-password.result
  }

  tags = {
    Terraform = true
  }
}

resource "aws_s3_bucket" "example-lambda-bucket" {
  bucket = "terraformation-example-lambda-${terraform.workspace}"

  tags = {
    Terraform = "true"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.example-lambda-bucket.bucket
}

output "bucket_arn" {
  value = aws_s3_bucket.example-lambda-bucket.arn
}

output "lambda_name" {
  value = module.lambda_function.lambda_function_name
}

output "lambda_arn" {
  value = module.lambda_function.lambda_function_arn
}

output "super_secret_password" {
  value     = random_password.example-password.result
  sensitive = true
}
