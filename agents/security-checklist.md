# Security Checklist — Agency Deliverables

Use this before shipping any client work.

---

## Quick Checks (Every Project)

### 1. Secrets & API Keys
- [ ] No API keys in client-side JavaScript
- [ ] All secrets in `.env` (not committed)
- [ ] `.env` in `.gitignore`
- [ ] Production keys different from dev keys

### 2. Authentication
- [ ] Auth implemented (Clerk, Supabase Auth, etc.)
- [ ] No public routes to private data
- [ ] Session management working
- [ ] Password reset flow tested

### 3. Input Validation
- [ ] All user inputs sanitized
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (escape HTML output)
- [ ] File uploads validated (type, size)

### 4. Data Protection
- [ ] HTTPS only (Vercel handles this)
- [ ] Sensitive data encrypted at rest
- [ ] No PII in logs
- [ ] Database backups configured

---

## Compliance Awareness (When Applicable)

### SOC 2 (Enterprise Clients)
- Access controls documented
- Audit logging enabled
- Incident response plan exists

### GDPR (EU Users)
- Cookie consent implemented
- Data deletion request flow
- Privacy policy current
- Data processing documented

### HIPAA (Health Data)
- BAA with vendors
- Encryption at rest AND in transit
- Access logs retained
- PHI handling procedures

---

## Pre-Ship Command
```bash
# Quick security scan
grep -r "api_key\|apikey\|secret\|password" --include="*.js" --include="*.ts" src/
```

---

*If any box is unchecked, don't ship until fixed.*
