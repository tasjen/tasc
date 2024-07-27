output "cloudfront_domain" {
  value = aws_cloudfront_distribution.main.domain_name
  description = "Add a CNAME record to your custom domain with this domain"
}