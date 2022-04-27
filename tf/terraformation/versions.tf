terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.8.0"
    }
  }

  backend "s3" {
    bucket = "public-terraformation-state"
    key    = "terraformation.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {}
