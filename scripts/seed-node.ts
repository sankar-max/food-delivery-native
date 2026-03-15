import dummyData from "../lib/seed.data";
import fs from "fs";
import path from "path";

// Configuration from environment
const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "69b1be93000a0f94d4fb";
const DATABASE_ID = "69b1c0750023dad30c37";
const BUCKET_ID = "69b5b081003949718a9e";

const TABLES = {
  categories: "categories",
  menu: "menu",
  customization: "customization",
  menu_customization: "menu_customization",
};

const headers = {
  "X-Appwrite-Project": PROJECT_ID,
  "Content-Type": "application/json",
};

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function uploadImage(url: string) {
  console.log(`Downloading ${url}...`);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const fileName = url.split("/").pop() || "image.png";

  const formData = new FormData();
  formData.append("fileId", generateId());
  formData.append("file", new Blob([buffer]), fileName);

  console.log(`Uploading ${fileName} to Appwrite...`);
  const uploadRes = await fetch(`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files`, {
    method: "POST",
    headers: {
      "X-Appwrite-Project": PROJECT_ID,
    },
    body: formData,
  });

  const fileData = await uploadRes.json();
  if (!uploadRes.ok) {
    throw new Error(`Upload failed: ${JSON.stringify(fileData)}`);
  }

  console.log(`Uploaded! ID: ${fileData.$id}`);
  return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileData.$id}/view?project=${PROJECT_ID}`;
}

async function safeCreateDocument(collectionId: string, data: any) {
  let attemptData = { ...data };
  let triedFlipping = new Set<string>();

  while (true) {
    const res = await fetch(`${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/documents`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        documentId: generateId(),
        data: attemptData,
      }),
    });

    const result = await res.json();
    if (res.ok) return result;

    const msg = result.message || "";
    // Handle Unknown Attribute
    if (msg.includes("Unknown attribute") || msg.includes("Invalid document structure")) {
      const match = msg.match(/attribute: "([^"]+)"/);
      if (match && match[1]) {
        console.warn(`⚠️ Skipping missing attribute "${match[1]}" in ${collectionId}`);
        delete attemptData[match[1]];
        continue;
      }
    }

    // Handle Relationship Mismatch
    if (msg.includes("Invalid relationship value")) {
      console.warn(`🔄 Relationship mismatch in ${collectionId}. Attempting auto-fix...`);
      let changed = false;
      for (const key in attemptData) {
        if (!triedFlipping.has(key)) {
          const val = attemptData[key];
          if (Array.isArray(val)) {
            attemptData[key] = val[0];
            triedFlipping.add(key);
            changed = true;
            break;
          } else if (typeof val === "string" && val.length > 5) {
            attemptData[key] = [val];
            triedFlipping.add(key);
            changed = true;
            break;
          }
        }
      }
      if (changed) continue;

      // If flipping didn't work, remove it
      for (const key in attemptData) {
        if (triedFlipping.has(key)) {
          console.warn(`🚫 Removing failed relationship attribute "${key}"`);
          delete attemptData[key];
          changed = true;
          break;
        }
      }
      if (changed) continue;
    }

    console.error(`❌ Permanent failure in ${collectionId}:`, msg);
    throw new Error(msg);
  }
}

async function main() {
  try {
    console.log("Starting Seeding Process...");

    // 1. Categories
    console.log("\n--- Seeding Categories ---");
    const categoryMap: Record<string, string> = {};
    for (const cat of dummyData.categories) {
      const doc = await safeCreateDocument(TABLES.categories, cat);
      categoryMap[cat.name] = doc.$id;
    }

    // 2. Customizations
    console.log("\n--- Seeding Customizations ---");
    const customizationMap: Record<string, string> = {};
    for (const cus of dummyData.customizations) {
      const doc = await safeCreateDocument(TABLES.customization, cus);
      customizationMap[cus.name] = doc.$id;
    }

    // 3. Menu Items
    console.log("\n--- Seeding Menu Items ---");
    for (const item of dummyData.menu) {
      const imageUrl = await uploadImage(item.image_url);
      const doc = await safeCreateDocument(TABLES.menu, {
        name: item.name,
        description: item.description,
        image_url: imageUrl,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      });

      // 4. Menu Customizations
      console.log(`Linking customizations for ${item.name}...`);
      for (const cusName of item.customizations) {
        if (customizationMap[cusName]) {
          await safeCreateDocument(TABLES.menu_customization, {
            menu: doc.$id,
            customization: customizationMap[cusName],
          });
        }
      }
    }

    console.log("\n✅ Seeding Complete!");
  } catch (e) {
    console.error("\n💥 Seeding Failed:", e);
    process.exit(1);
  }
}

main();
