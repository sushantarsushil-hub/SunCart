import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

// Read database file and return structured arrays
function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], sessions: [], accounts: [], verifications: [] }, null, 2));
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { users: [], sessions: [], accounts: [], verifications: [] };
  }
}

// Write arrays back to JSON file
function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Helper to convert model name to key
function getModelKey(model) {
  return model + 's';
}

function normalizeValue(value) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') return String(value);
  return value;
}

function matchesCondition(item, cond) {
  const rawValue = item[cond.field];
  const itemValue = normalizeValue(rawValue);
  const targetValue = normalizeValue(cond.value);

  if (cond.operator === 'in') {
    if (!Array.isArray(cond.value)) return false;
    return cond.value.some((val) => normalizeValue(val) === itemValue);
  }
  if (cond.operator === 'gt') {
    return new Date(rawValue) > new Date(cond.value);
  }
  if (cond.operator === 'lt') {
    return new Date(rawValue) < new Date(cond.value);
  }
  if (cond.operator === 'gte') {
    return new Date(rawValue) >= new Date(cond.value);
  }
  if (cond.operator === 'lte') {
    return new Date(rawValue) <= new Date(cond.value);
  }
  return itemValue === targetValue;
}

function attachJoins(record, model, join, db) {
  if (!record || !join) return record;
  const enriched = { ...record };

  if (model === 'user' && join.account) {
    enriched.account = db.accounts.filter((account) => account.userId === record.id);
  }

  if (model === 'session' && join.user) {
    enriched.user = db.users.find((user) => user.id === record.userId) || null;
  }

  if (model === 'account' && join.user) {
    enriched.user = db.users.find((user) => user.id === record.userId) || null;
  }

  return enriched;
}

export const jsonDbAdapter = () => {
  return {
    id: 'json-db-adapter',
    create: async ({ model, data }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) db[key] = [];

      const record = { ...data };
      if (!record.id) {
        record.id = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      }

      if (record.createdAt) record.createdAt = new Date(record.createdAt);
      if (record.updatedAt) record.updatedAt = new Date(record.updatedAt);
      if (record.expiresAt) record.expiresAt = new Date(record.expiresAt);

      db[key].push(record);
      writeDb(db);
      return record;
    },

    findOne: async ({ model, where, join }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return null;

      const record = db[key].find((item) => {
        return where.every((cond) => matchesCondition(item, cond));
      });

      return record ? attachJoins(record, model, join, db) : null;
    },

    findMany: async ({ model, where, sortBy, limit, offset, join }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return [];
      let records = db[key];
      if (where && where.length > 0) {
        records = records.filter((item) => {
          return where.every((cond) => matchesCondition(item, cond));
        });
      }

      if (sortBy && sortBy.length > 0) {
        const [field, direction] = sortBy[0];
        records = [...records].sort((a, b) => {
          const aValue = a[field];
          const bValue = b[field];
          if (aValue === bValue) return 0;
          return direction === 'desc' ? (aValue < bValue ? 1 : -1) : (aValue > bValue ? 1 : -1);
        });
      }

      if (typeof offset === 'number') records = records.slice(offset);
      if (typeof limit === 'number') records = records.slice(0, limit);

      if (join) {
        return records.map((record) => attachJoins(record, model, join, db));
      }
      return records;
    },

    update: async ({ model, where, update }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return null;

      let updatedRecord = null;
      db[key] = db[key].map((item) => {
        const matches = where.every((cond) => matchesCondition(item, cond));
        if (matches) {
          updatedRecord = { ...item, ...update, updatedAt: new Date() };
          return updatedRecord;
        }
        return item;
      });

      if (updatedRecord) writeDb(db);
      return updatedRecord;
    },

    delete: async ({ model, where }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return;

      db[key] = db[key].filter((item) => {
        return !where.every((cond) => matchesCondition(item, cond));
      });
      writeDb(db);
    },

    count: async ({ model, where }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return 0;
      if (!where || where.length === 0) return db[key].length;
      return db[key].filter((item) => where.every((cond) => matchesCondition(item, cond))).length;
    },

    updateMany: async ({ model, where, update }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return null;

      let updated = null;
      db[key] = db[key].map((item) => {
        const matches = where.every((cond) => matchesCondition(item, cond));
        if (matches) {
          updated = { ...item, ...update, updatedAt: new Date() };
          return updated;
        }
        return item;
      });

      if (updated) writeDb(db);
      return updated;
    },

    deleteMany: async ({ model, where }) => {
      const db = readDb();
      const key = getModelKey(model);
      if (!db[key]) return;

      db[key] = db[key].filter((item) => {
        return !where.every((cond) => matchesCondition(item, cond));
      });
      writeDb(db);
    }
  };
};
