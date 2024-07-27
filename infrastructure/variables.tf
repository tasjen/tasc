variable "app_domain" {
  type = string
  default = "tasc.tasjen.pro"
}

variable "acm_certificate_arn" {
  type        = string
  description = "An arn of a certificate issued by ACM in us-east-1 for the domain your custom domain"
}

variable "prod_mongo_uri" {
  type        = string
  description = "mongodb uri for production"
}

variable "secret" {
  type        = string
  description = "JWT secret"
}