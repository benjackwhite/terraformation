module "iam_terraformation_user" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-user"
  version = "4.11.0"

  name                          = "terraformation"
  force_destroy                 = true
  password_reset_required       = false
  create_iam_user_login_profile = false
}

resource "aws_iam_policy" "terraformation-bucket-access" {
  name        = "terraformation-bucket-policy"
  description = "Allows read access to the public-safe terraform bucket"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:ListBucket",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${aws_s3_bucket.public-tf-state-bucket.bucket}"
        }, {
        Action   = ["s3:GetObject"]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${aws_s3_bucket.public-tf-state-bucket.bucket}/*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "terraformation-bucket-access" {
  user       = module.iam_terraformation_user.iam_user_name
  policy_arn = aws_iam_policy.terraformation-bucket-access.arn
}

output "terraformation_aws_access_key_id" {
  value     = module.iam_terraformation_user.iam_access_key_id
  sensitive = true
}

output "terraformation_aws_secret_access_key" {
  value     = module.iam_terraformation_user.iam_access_key_secret
  sensitive = true
}
