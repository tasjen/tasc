resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  aliases = [var.app_domain]
  price_class = "PriceClass_200"
  origin {
    origin_id                = aws_lambda_function_url.main.url_id
    domain_name              = replace(aws_lambda_function_url.main.function_url, "/https:\\/|\\//", "")
    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1.2"]
      origin_keepalive_timeout = 5
      origin_read_timeout      = 30
    }
  }

  default_cache_behavior {
    target_origin_id = aws_lambda_function_url.main.url_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods = ["GET", "HEAD"]
    cache_policy_id  = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # AllViewerExceptHostHeader
    compress = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["TH"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "tasc-cloudfront"
  }
}