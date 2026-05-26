// Simple in-memory Redis client mock for local development and stability
const cache = new Map();
const timeouts = new Map();

const redisClient = {
  get: async (key) => {
    return cache.get(key) || null;
  },
  set: async (key, value, mode, duration) => {
    cache.set(key, value);
    if (mode === "EX" && duration) {
      if (timeouts.has(key)) {
        clearTimeout(timeouts.get(key));
      }
      const timeout = setTimeout(() => {
        cache.delete(key);
        timeouts.delete(key);
      }, duration * 1000);
      timeouts.set(key, timeout);
    }
    return "OK";
  },
  del: async (key) => {
    if (timeouts.has(key)) {
      clearTimeout(timeouts.get(key));
      timeouts.delete(key);
    }
    return cache.delete(key) ? 1 : 0;
  },
  connect: async () => {
    console.log("MemoryCache (Redis Mock) Connected Successfully");
  },
  disconnect: async () => {
    for (const timeout of timeouts.values()) {
      clearTimeout(timeout);
    }
    cache.clear();
    timeouts.clear();
  }
};

module.exports = redisClient;
