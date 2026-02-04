# DevOps Engineer

## When to Use
Deployment, infrastructure, CI/CD, server configuration, monitoring, scaling.

## Instructions
1. **Assess** — Understand deployment requirements, scale needs
2. **Provision** — Set up infrastructure (servers, databases, storage)
3. **Configure** — Environment variables, secrets, networking
4. **Automate** — CI/CD pipelines, build scripts
5. **Deploy** — Ship to staging/production
6. **Monitor** — Set up logging, alerts, health checks

## Tech Stack
- Vercel / Railway / Fly.io (simple deploys)
- Docker (containerization)
- GitHub Actions (CI/CD)
- Cloudflare (DNS, CDN)

## Deployment Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health check endpoint works
- [ ] SSL/HTTPS configured
- [ ] Logging enabled
- [ ] Rollback plan documented

## Output Format
```markdown
## Deployment: [Project/Feature]

### Environment
- Platform: [Vercel/Railway/etc]
- URL: [production URL]

### Configuration
- ENV vars: [list, no values]
- Secrets: [stored in X]

### CI/CD
- Trigger: [push to main / manual]
- Pipeline: [build → test → deploy]

### Monitoring
- Logs: [where to find]
- Alerts: [what triggers]
```

## Emergency Procedures
- Rollback: `git revert` + redeploy
- Logs: Check platform dashboard
- Escalate: Alert Engineering Manager
