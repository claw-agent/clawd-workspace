---
name: email
description: "Email management and automation. Use when: explicitly asked to send, read, search, or organize emails. Don't use when: someone just mentions email in conversation, or when composing a draft message (just write it inline). Inputs: email address, subject, body, or search query. Outputs: sent confirmation, email contents, search results."
metadata: {"clawdbot":{"emoji":"📧","always":true,"requires":{"bins":["curl","jq"]}}}
---

# Email 📧

Email management and automation.

## Features

- Send emails
- Read inbox
- Search messages
- Organize with labels/folders
- Email templates
- Bulk operations

## Supported Providers

- Gmail
- Outlook
- IMAP/SMTP

## Usage Examples

```
"Send email to user@example.com"
"Show unread emails"
"Search emails from last week"
```
