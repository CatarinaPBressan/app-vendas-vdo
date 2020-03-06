"""
Script tool for deploying our containers via boto->ECS.
"""
from pprint import pprint
import argparse

import boto3

## These templates map directly to args and schemas expected by the boto ecs call APIs:
##  http://boto3.readthedocs.io/en/latest/reference/services/ecs.html#ECS.Client.update_service
##  http://boto3.readthedocs.io/en/latest/reference/services/ecs.html#ECS.Client.register_task_definition

AWS_REGION = "sa-east-1"

DOCKER_REPO = f"776942401551.dkr.ecr.{AWS_REGION}.amazonaws.com/backend"

BACKEND_TASK_DEFINITION_TEMPLATE = {
    "family": "backend-{environment}",
    "taskRoleArn": "arn:aws:iam::776942401551:role/backend-{environment}",
    "containerDefinitions": [
        {
            "essential": True,
            "name": "backend-{environment}",
            "memory": 1024,
            "cpu": 0,
            "command": [
                "pipenv",
                "run",
                "flask",
                "run",
                "--host",
                "0.0.0.0",
                "--port",
                "5000",
            ],
            # "command": ["uwsgi", "backend/uwsgi.ini"],
            "image": "{docker_repo}:{version}",
            "portMappings": [
                {
                    "containerPort": 5000,
                    "hostPort": 0,
                }  # Port 0 provides dynamic port mapping
            ],
            "environment": [{"name": "FLASK_ENV", "value": "{environment}"},],
        }
    ],
}


BACKEND_SERVICE_DEFINITION_TEMPLATE = {
    "desiredCount": 1,
    "service": "main-{environment}",
    "cluster": "main-{environment}",
    "deploymentConfiguration": {"minimumHealthyPercent": 100, "maximumPercent": 200},
}

BACKEND_TASK = {
    "task_def": BACKEND_TASK_DEFINITION_TEMPLATE,
    "service_def": BACKEND_SERVICE_DEFINITION_TEMPLATE,
}

ALL_TASKS = {
    "backend": [BACKEND_TASK],
}


def format_template(template, **kwargs):
    """
    Simple recursive function to just substitute kwargs into nested values within the service/task
    definition templates.
    :param template:
    :param kwargs:
    :return:
    """

    def format_value(value):
        if type(value) is str:
            return value.format(**kwargs)
        elif type(value) is dict:
            return format_template(value, **kwargs)
        elif type(value) is list:
            return [format_template(t, **kwargs) for t in value]
        else:
            return value

    if type(template) is dict:
        container_def = {}
        for k, v in list(template.items()):
            container_def[k] = format_value(v)
        return container_def
    else:
        return format_value(template)


def deploy_ecs_task(boto_ecs_client, task, dry_run=False, **kwargs):
    """
    Uses the boto ecs client to push the specified container definition which we map 1:1 with the
    task family.
    :param boto_ecs_client:
    :param container_def_template:
    :param environment:
    :param version:
    :return:
    """

    task_def_template = task["task_def"]
    task_def = format_template(task_def_template, **kwargs)
    pprint(("TASK DEF: {}".format(task_def)))

    service_def_template = task["service_def"]
    service_def = format_template(service_def_template, **kwargs)

    pprint(("SERVICE DEF: {}".format(service_def)))

    if not dry_run:

        # register the task definition
        task_def_response = boto_ecs_client.register_task_definition(**task_def)
        task_arn = task_def_response["taskDefinition"]["taskDefinitionArn"]

        # update the service to leverage the right task
        service_update_response = boto_ecs_client.update_service(
            taskDefinition=task_arn, **service_def
        )
        print("Good to go.")

    else:
        print("Dry run. Skipping deploy.")


def init_boto_ecs_client():
    """
    Initializes the client for bridging ECS.
    :return:
    """
    return boto3.client("ecs", region_name=AWS_REGION)


def deploy_ecs_tasks(**kwargs):
    """
    Deploys all ecs tasks, one by one.
    :param kwargs:
    :return:
    """

    boto_ecs_client = init_boto_ecs_client()

    for task in ALL_TASKS[kwargs["service"]]:
        deploy_ecs_task(boto_ecs_client, task, **kwargs)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--environment", choices=["staging", "production"], default="staging"
    )
    parser.add_argument("--service", choices=list(ALL_TASKS.keys()), required=True)
    parser.add_argument("--version", action="store", required=True)
    parser.add_argument("--dry-run", action="store_true")

    cmd_line_args = parser.parse_args()
    cmd_line_args = vars(cmd_line_args)

    # Add additional variables to be replaced in the templates
    cmd_line_args["docker_repo"] = DOCKER_REPO

    deploy_ecs_tasks(**cmd_line_args)
