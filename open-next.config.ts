import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext config for Cloudflare Workers. Defaults are fine for a
 * portfolio/demo site — no R2 incremental cache or KV tag cache needed.
 * If you wire in heavier ISR later, add an `incrementalCache` and
 * `tagCache` here per https://opennext.js.org/cloudflare/caching.
 */
export default defineCloudflareConfig({});
