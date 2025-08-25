import { createClient } from '@supabase/supabase-js'
import './types.js'

const supabaseUrl = 'https://bduvbthlqywpqhtaiznj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdXZidGhscXl3cHFodGFpem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzY3NDYsImV4cCI6MjA3MTQ1Mjc0Nn0.1RfS0ILToYixyoqhgAYXIe1g_jd7Py25EOuhVfrEHOM'
const supabase = createClient(supabaseUrl, supabaseKey)

// 📥 ดึงข้อมูลทั้งหมด (list)
export async function fetchWeights() {
  const { data, error } = await supabase
    .from('Pantagon_Weight')
    .select('*')
    .order('recorded_at', { ascending: true })
  
  if (error) {
    throw new Error(`Error fetching weights: ${error.message}`)
  }
  
  return data.map(record => ({
    id: record.id,
    Weight: record.weight_kg,
    Date: record.recorded_at,
    Details: record.details || "",
    Exercise: record.exercised || false,
  }))
}

// ➕ เพิ่มรายการ (create)
export async function addWeightEntry({ weight, date, note, exercise }) {
  try {
    const insertData = {
      weight_kg: parseFloat(weight),
      recorded_at: new Date(date).toISOString(),
      details: note || null,
      exercised: typeof exercise === 'boolean' ? exercise : false,
    }
    
    console.log('Inserting data:', insertData)
    
    const { data, error } = await supabase
      .from('Pantagon_Weight')
      .insert([insertData])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Error adding weight entry: ${error.message}`)
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation')
    }
    
    const record = data[0]
    return {
      id: record.id,
      Weight: record.weight_kg,
      Date: record.recorded_at,
      Details: record.details || "",
      Exercise: record.exercised || false,
    }
  } catch (err) {
    console.error('Error in addWeightEntry:', err)
    throw err
  }
}

// ✏️ แก้ไขรายการ (update)
export async function updateWeightEntry({ id, weight, date, note }) {
  const { data, error } = await supabase
    .from('Pantagon_Weight')
    .update({
      weight_kg: weight,
      recorded_at: new Date(date).toISOString(),
      details: note || "",
    })
    .eq('id', id)
    .select()
  
  if (error) {
    throw new Error(`Error updating weight entry: ${error.message}`)
  }
  
  const record = data[0]
  return {
    id: record.id,
    Weight: record.weight_kg,
    Date: record.recorded_at,
    Details: record.details || "",
    Exercise: record.exercised || false,
  }
}

// ❌ ลบรายการ (delete)
export async function deleteWeightEntry(id) {
  const { error } = await supabase
    .from('Pantagon_Weight')
    .delete()
    .eq('id', id)
  
  if (error) {
    throw new Error(`Error deleting weight entry: ${error.message}`)
  }
  
  return true
}
