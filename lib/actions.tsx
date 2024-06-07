'use server'

import { signIn } from "next-auth/react"

 
 
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const credentials = Object.fromEntries(formData);
    await signIn('credentials', {...credentials})
  } catch (error) {
    // if (error) {
    //   switch (error) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.'
    //     default:
    //       return 'Something went wrong.'
    //   }
    // }
    throw error
  }
}