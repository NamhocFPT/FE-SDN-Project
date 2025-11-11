// Base domain for API. Backend mounts most routes under /api
const API_DOMAIN = "http://localhost:9999/api/";

// ✅ GET
export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path, buildAuth());
  const result = await response.json();
  return result;
};

// ✅ POST

export const post = async (path, option) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    ...buildAuth(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(buildAuth().headers || {}),
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  return result;
};

// ✅ PATCH
export const patch = async (path, option, id) => {
  const response = await fetch(API_DOMAIN + path + "/" + id, {
    method: "PATCH",
    ...buildAuth(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(buildAuth().headers || {}),
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  return result;
};

// ✅ PUT (thêm mới — hỗ trợ cập nhật dạng full update)
export const put = async (path, option) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    ...buildAuth(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(buildAuth().headers || {}),
    },
    body: JSON.stringify(option),
  });
  const result = await response.json();
  return result;
};

// ✅ DELETE
export const dele = async (path, id) => {
  const response = await fetch(API_DOMAIN + path + "/" + id, {
    method: "DELETE",
    ...buildAuth(),
    headers: buildAuth().headers,
  });
  const result = await response.json();
  return result;
};

// Helper: attach Authorization header if token exists
function buildAuth() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return {};
    return { headers: { Authorization: `Bearer ${token}` } };
  } catch (_) {
    return {};
  }
}
