#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const schema = JSON.parse(fs.readFileSync(path.join(root, "service-schema.json"), "utf8"));
const serviceDirs = ["services/x402", "services/mcp", "services/apis"];

const required = schema.required;
const categoryEnum = schema.properties.category.enum;
const typeEnum = schema.properties.type.enum;
const statusEnum = schema.properties.status.enum;
const agentInterfaceEnum = schema.properties.agent_interfaces.items.enum;
const transportEnum = schema.properties.mcp.properties.transport.items.enum;
const slugPattern = new RegExp(schema.properties.slug.pattern);

let failures = 0;

function fail(file, message) {
  failures += 1;
  console.error(`${file}: ${message}`);
}

function isUri(value) {
  if (typeof value !== "string") return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function expectString(file, entry, key) {
  if (entry[key] !== undefined && typeof entry[key] !== "string") {
    fail(file, `${key} must be a string`);
  }
}

function expectUri(file, entry, key) {
  if (entry[key] !== undefined && !isUri(entry[key])) {
    fail(file, `${key} must be a valid http(s) URI`);
  }
}

function expectStringArray(file, entry, key, allowed) {
  if (!Array.isArray(entry[key])) {
    fail(file, `${key} must be an array`);
    return;
  }
  if (entry[key].length === 0) {
    fail(file, `${key} must not be empty`);
  }
  const seen = new Set();
  for (const item of entry[key]) {
    if (typeof item !== "string") {
      fail(file, `${key} items must be strings`);
      continue;
    }
    if (allowed && !allowed.includes(item)) {
      fail(file, `${key} contains unsupported value: ${item}`);
    }
    if (seen.has(item)) {
      fail(file, `${key} contains duplicate value: ${item}`);
    }
    seen.add(item);
  }
}

function validateService(file, entry) {
  for (const key of required) {
    if (entry[key] === undefined) {
      fail(file, `missing required field: ${key}`);
    }
  }

  for (const key of Object.keys(entry)) {
    if (!schema.properties[key]) {
      fail(file, `unknown field: ${key}`);
    }
  }

  expectString(file, entry, "name");
  expectString(file, entry, "slug");
  expectString(file, entry, "category");
  expectString(file, entry, "type");
  expectString(file, entry, "description");
  expectString(file, entry, "submitted_by");

  if (typeof entry.name === "string" && entry.name.length < 2) {
    fail(file, "name must be at least 2 characters");
  }
  if (typeof entry.slug === "string" && !slugPattern.test(entry.slug)) {
    fail(file, "slug must be lowercase kebab-case");
  }
  if (typeof entry.category === "string" && !categoryEnum.includes(entry.category)) {
    fail(file, `category must be one of: ${categoryEnum.join(", ")}`);
  }
  if (typeof entry.type === "string" && !typeEnum.includes(entry.type)) {
    fail(file, `type must be one of: ${typeEnum.join(", ")}`);
  }
  if (typeof entry.description === "string") {
    if (entry.description.length < 20) fail(file, "description must be at least 20 characters");
    if (entry.description.length > 400) fail(file, "description must be 400 characters or fewer");
  }
  if (entry.status !== undefined && !statusEnum.includes(entry.status)) {
    fail(file, `status must be one of: ${statusEnum.join(", ")}`);
  }

  expectUri(file, entry, "url");
  expectUri(file, entry, "repository");
  expectUri(file, entry, "documentation");
  expectUri(file, entry, "npm");

  expectStringArray(file, entry, "tags");
  expectStringArray(file, entry, "agent_interfaces", agentInterfaceEnum);

  if (entry.x402 !== undefined) {
    if (typeof entry.x402 !== "object" || entry.x402 === null || Array.isArray(entry.x402)) {
      fail(file, "x402 must be an object");
    } else {
      for (const key of Object.keys(entry.x402)) {
        if (!schema.properties.x402.properties[key]) fail(file, `unknown x402 field: ${key}`);
      }
      if (entry.x402.enabled !== undefined && typeof entry.x402.enabled !== "boolean") {
        fail(file, "x402.enabled must be a boolean");
      }
      if (entry.x402.discovery_url !== undefined && !isUri(entry.x402.discovery_url)) {
        fail(file, "x402.discovery_url must be a valid http(s) URI");
      }
    }
  }

  if (entry.mcp !== undefined) {
    if (typeof entry.mcp !== "object" || entry.mcp === null || Array.isArray(entry.mcp)) {
      fail(file, "mcp must be an object");
    } else {
      for (const key of Object.keys(entry.mcp)) {
        if (!schema.properties.mcp.properties[key]) fail(file, `unknown mcp field: ${key}`);
      }
      if (entry.mcp.server_name !== undefined && typeof entry.mcp.server_name !== "string") {
        fail(file, "mcp.server_name must be a string");
      }
      if (entry.mcp.install !== undefined && typeof entry.mcp.install !== "string") {
        fail(file, "mcp.install must be a string");
      }
      if (entry.mcp.glama_url !== undefined && !isUri(entry.mcp.glama_url)) {
        fail(file, "mcp.glama_url must be a valid http(s) URI");
      }
      if (entry.mcp.transport !== undefined) {
        if (!Array.isArray(entry.mcp.transport)) {
          fail(file, "mcp.transport must be an array");
        } else {
          const seen = new Set();
          for (const transport of entry.mcp.transport) {
            if (!transportEnum.includes(transport)) {
              fail(file, `mcp.transport contains unsupported value: ${transport}`);
            }
            if (seen.has(transport)) fail(file, `mcp.transport contains duplicate value: ${transport}`);
            seen.add(transport);
          }
        }
      }
    }
  }
}

for (const dir of serviceDirs) {
  const absDir = path.join(root, dir);
  if (!fs.existsSync(absDir)) {
    fail(dir, "directory does not exist");
    continue;
  }
  for (const name of fs.readdirSync(absDir).sort()) {
    if (!name.endsWith(".json")) continue;
    const file = path.join(dir, name);
    const absFile = path.join(root, file);
    let entry;
    try {
      entry = JSON.parse(fs.readFileSync(absFile, "utf8"));
    } catch (error) {
      fail(file, `invalid JSON: ${error.message}`);
      continue;
    }
    validateService(file, entry);
  }
}

if (failures > 0) {
  console.error(`\nValidation failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("Service validation passed.");
