const BASE_ID = "appMxIp8icT3ChL8V"
const TABLE_NAME = "2025"
const API_TOKEN = "patuzLLG6WyRYBFUu.e0b1e42ec82722a482ac77543e94c97eabc1cf55206eb46f656a934cb07402df"
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
}

// 📥 ดึงข้อมูลทั้งหมด (list)
export async function fetchWeights() {
  const res = await fetch(`${API_URL}?sort[0][field]=Date&sort[0][direction]=asc`, {
    headers,
  })
  const data = await res.json()
  return data.records.map(record => ({
    id: record.id,
    ...record.fields,
  }))
}

// ➕ เพิ่มรายการ (create)
export async function addWeightEntry({ weight, date, note }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      records: [
        {
          fields: {
            Weight: weight,
            Details: note || "",
            Date: new Date(date).toISOString(),
          },
        },
      ],
    }),
  })
  const data = await res.json()
  return {
    id: data.records[0].id,
    ...data.records[0].fields,
  }
}

// ✏️ แก้ไขรายการ (update)
export async function updateWeightEntry({ id, weight, date, note }) {
  const res = await fetch(API_URL, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      records: [
        {
          id,
          fields: {
            Weight: weight,
            Details: note || "",
            Date: new Date(date).toISOString(),
          },
        },
      ],
    }),
  })
  const data = await res.json()
  return {
    id: data.records[0].id,
    ...data.records[0].fields,
  }
}

// ❌ ลบรายการ (delete)
export async function deleteWeightEntry(id) {
  const url = `${API_URL}?records[]=${id}`
  const res = await fetch(url, {
    method: "DELETE",
    headers,
  })
  const data = await res.json()
  return data.records[0].deleted === true
}
