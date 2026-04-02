import dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

// 🔥 load env from apps/admin/.env.local
dotenv.config({
  path: path.resolve('apps/admin/.env.local'),
})

// 🧪 debug (optional)
// console.log(process.env)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const email = 'leobarbosacontact@gmail.com'
const password = 'Admin123456!'

// 🔁 check if user already exists
const { data: usersData } = await supabase.auth.admin.listUsers()

const existingUser = usersData.users.find(
  (u) => u.email === email
)

let result

if (existingUser) {
  console.log('User exists → updating password')

  result = await supabase.auth.admin.updateUserById(existingUser.id, {
    password,
    email_confirm: true,
  })
} else {
  console.log('Creating new admin user')

  result = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
}

if (result.error) {
  console.error('Error:', result.error.message)
  process.exit(1)
}

console.log('✅ Admin ready:', email)