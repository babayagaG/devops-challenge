output "vpc_id" {
  value = module.vpc.vpc_id
}

output "cluster_name" {
  value = module.ecs.cluster_name
}

output "ecs_instance_id" {
  value = module.ecs.instance_id
}
