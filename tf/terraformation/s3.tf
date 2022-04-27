resource "aws_s3_bucket" "public-tf-state-bucket" {
  bucket = "public-terraformation-state"

  tags = {
    Terraform = "true"
  }
}

resource "aws_s3_bucket_versioning" "public-tf-state-bucket" {
  bucket = aws_s3_bucket.public-tf-state-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}


resource "aws_s3_bucket_acl" "public-tf-state-bucket" {
  bucket = aws_s3_bucket.public-tf-state-bucket.id
  acl    = "private"
}
