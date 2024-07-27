resource "aws_lambda_function" "main" {
  role          = aws_iam_role.main.arn
  function_name = "tasc-lambda"
  runtime = "nodejs20.x"
  filename      = "tasc-prod.zip"
  handler       = "index.handler"

  environment {
    variables = {
      NODE_ENV = "prod"
      PROD_MONGO_URI = var.prod_mongo_uri
      SECRET = var.secret
    }
  }

  tags = {
    Name = "tasc-lambda"
  }
}

resource "aws_iam_role" "main" {
name   = "tasc-lambda-role"
assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  EOF

  tags = {
    Name = "tasc-lambda-role"
  }
}

resource "aws_lambda_function_url" "main" {
  function_name      = aws_lambda_function.main.function_name
  authorization_type = "NONE"
}