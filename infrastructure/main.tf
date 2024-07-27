terraform {
  required_version = ">= 1.9.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59"
    }
  }
  cloud {
    organization = "tasjen-org"
    workspaces {
      name = "tasc"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}