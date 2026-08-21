// lib/apiError.js
// Mongoose/DB errors ko padhne laayak message me badalta hai.

const FIELD_LABELS = {
  name: "Name",
  slug: "Slug",
  price: "Price",
  compareAtPrice: "Compare-at price",
  stock: "Stock",
  category: "Category",
  email: "Email",
  title: "Title",
};

const label = (field) => FIELD_LABELS[field] || field;

export function toApiError(err) {
  // duplicate key (unique index) — e.g. same slug
  if (err?.code === 11000) {
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || "field";
    const value = err.keyValue?.[field];
    return {
      status: 409,
      body: {
        error: value
          ? `${label(field)} "${value}" is already in use. Please choose another.`
          : `That ${label(field).toLowerCase()} is already in use.`,
        fieldErrors: { [field]: `This ${label(field).toLowerCase()} is already taken.` },
      },
    };
  }

  // schema validation
  if (err?.name === "ValidationError") {
    const fieldErrors = {};
    for (const [key, e] of Object.entries(err.errors || {})) {
      fieldErrors[key] = e?.message || `${label(key)} is invalid.`;
    }
    return {
      status: 400,
      body: {
        error: Object.values(fieldErrors)[0] || "Please check the highlighted fields.",
        fieldErrors,
      },
    };
  }

  // galat ObjectId / galat type
  if (err?.name === "CastError") {
    return {
      status: 400,
      body: {
        error: `${label(err.path)} has an invalid value.`,
        fieldErrors: { [err.path]: "Invalid value." },
      },
    };
  }

  console.error("Unhandled API error:", err);
  return {
    status: 500,
    body: { error: "Something went wrong on our side. Please try again." },
  };
}

/* client ke liye: response se error nikaalo, HTML aa jaaye tab bhi na tootey */
export async function readApiError(res) {
  const text = await res.text().catch(() => "");
  try {
    const data = JSON.parse(text);
    return {
      error: data.error || `Request failed (${res.status}).`,
      fieldErrors: data.fieldErrors || {},
    };
  } catch {
    return {
      error:
        res.status === 401
          ? "Your session expired. Please sign in again."
          : res.status === 413
          ? "That file is too large."
          : `Server error (${res.status}). Please try again.`,
      fieldErrors: {},
    };
  }
}