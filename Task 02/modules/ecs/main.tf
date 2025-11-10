###########################################
# ECS Cluster + EC2 Instance + Service
###########################################

# ECS Cluster
resource "aws_ecs_cluster" "cody_cluster" {
  name = "cody-ecs-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "cody-ecs-cluster"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "cody_task" {
  family                   = "cody-app-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "cody-app"
      image     = "nginx:latest"
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

# IAM Role for ECS Instance
resource "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_policy_attach" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "ecs-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

# ECS EC2 Instance
resource "aws_instance" "ecs_instance" {
  ami                         = "ami-0e08624e94b430ab0" # Amazon Linux 2 ECS-Optimized AMI (ap-southeast-1)
  instance_type               = "t3.micro"
  subnet_id                   = element(var.subnets, 0)
  associate_public_ip_address  = true
  key_name                    = var.key_name
  iam_instance_profile         = aws_iam_instance_profile.ecs_instance_profile.name

  user_data = <<-EOF
              #!/bin/bash
              echo ECS_CLUSTER=${aws_ecs_cluster.cody_cluster.name} >> /etc/ecs/ecs.config
              systemctl enable --now ecs
              EOF

  tags = {
    Name = "ecs-instance"
  }
}

# ECS Service
resource "aws_ecs_service" "cody_service" {
  name            = "cody-service"
  cluster         = aws_ecs_cluster.cody_cluster.id
  task_definition = aws_ecs_task_definition.cody_task.arn
  desired_count   = 1
  launch_type     = "EC2"
}