import type { NextApiRequest, NextApiResponse } from 'next'

type ContactFormData = {
  name: string
  email: string
  message: string
  locale?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message, locale = 'en' } = req.body as ContactFormData

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (!resendApiKey) {
      // Fallback: Log to console if no email service configured
      console.log('📧 New contact form submission:')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      console.log('Locale:', locale)
      console.log('---')
      
      return res.status(200).json({ 
        success: true, 
        message: 'Form submitted (logged to console - email service not configured)' 
      })
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'DLFB Contact Form <onboarding@resend.dev>', // Will be replaced with your domain
        to: process.env.CONTACT_EMAIL || 'your-email@example.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Locale:</strong> ${locale}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted from dlfb.io contact form</small></p>
        `
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' })

  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ 
      error: 'Failed to process contact form',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
