# Terraformation

GUI for visualising your remote Terraform states in a Clouformation-esque way

[Live Demo](https://terraformation.benwhite.dev)

## Overview

Terraformation was built by a lover of the Terraform but who wanted after a small subset of the features offered by AWS Cloudformation - primarily **the GUI**. Hence the play on Terra(formation).

## Deploy

### Docker

Tagged commits on the `main` branch are pushed as Docker images to [the github registry](https://github.com/benjackwhite/terraformation/pkgs/container/terraformation)

This Docker image can be deployed to **Kubernetes** or otherwise as a simple stateless deployment.

To run locally see the `docker-compose.yaml` file as a starting point.

### Vercel Deploy

This option is probably fine for demo's or deployments with little-to-no sensitive state.

> WARNING

This is probably the easiest way to get started but gives you the fewest options for securing your web deployment. See their page on [protecting-deployments](https://vercel.com/blog/protecting-deployments) for more information

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbenjackwhite%2Fterraformation&env=TF_BUCKET_AWS_REGION,TF_BUCKET_NAME,TF_BUCKET_AWS_SECRET_ACCESS_KEY,TF_BUCKET_AWS_ACCESS_KEY_ID&envDescription=AWS%20Credentials%20to%20access%20your%20S3%20bucket%20containing%20Terraform%20state)

## Features

- Self-deployable either as a Docker container or to Vercel as a Next.js website / API.
- List view of all existing Terraform states in your remote backend, including workspaces
- Searchable and easy to browse list of resources within a Terraform state as well as outputs and the raw JSON if desireable
- Server-side redaction of all sensitive values such as passwords, access keys
- Link from resource to Terraform docs as well as resources like AWS if determinable

## Roadmap

- [ ] **History View** - With S3 versioning it would be possible to see a diff-like view of the deploys
- [ ] **Support for other remote backends** - Currently only S3 is supported
- [ ] **Alternative visualisations** - Integration with other 3rd party tools to generate graph-like views
- [ ] **State Dependencies** - It should be possible to determine which states use resources from other states by matching "resource" IDs with "data resource" IDs to build an inter-state depdency tree of sorts

### Probably not on the roadmap...

- ╳ **Complex login flows** - if you need special auth I would expect this to be done in your Kubernetes Ingress or AWS ALB rules instead
- ╳ **Destroy / update commands** - Running Terraform apply / destroy requires access to your raw code / provider credentials which would make this a much more sensitive and complex project
