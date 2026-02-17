# Cron job delivery needs explicit target
**Date:** 2026-02-07
**Lesson:** Cron jobs with `delivery.mode: "announce"` need explicit `delivery.to: "<chat_id>"` or Telegram fails silently. Always specify the target.
