output "cluster_id" {
  value = aws_ecs_cluster.cody_cluster.id
}

output "cluster_name" {
  value = aws_ecs_cluster.cody_cluster.name
}

output "instance_id" {
  value = aws_instance.ecs_instance.id
}
