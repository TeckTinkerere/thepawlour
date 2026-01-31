# Google Form Setup Guide for The Pawlour Contact Page

## Overview
The contact page now includes an embedded Google Form for inquiries. Follow these steps to set up your Google Form and integrate it with the website.

## Step-by-Step Setup

### 1. Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click on the **"+"** button to create a new form
3. Give your form a title: **"The Pawlour - Contact Form"**
4. Add a description: **"Get in touch with us for grooming inquiries and bookings"**

### 2. Add Form Fields

Add the following fields to your form:

#### Field 1: Name
- **Question:** "What is your name?"
- **Type:** Short answer
- **Required:** Yes

#### Field 2: Email
- **Question:** "What is your email address?"
- **Type:** Short answer
- **Required:** Yes

#### Field 3: Phone Number
- **Question:** "What is your phone number?"
- **Type:** Short answer
- **Required:** Yes

#### Field 4: Pet Name
- **Question:** "What is your pet's name?"
- **Type:** Short answer
- **Required:** No

#### Field 5: Pet Breed
- **Question:** "What breed is your pet?"
- **Type:** Short answer
- **Required:** No

#### Field 6: Service Interest
- **Question:** "Which service are you interested in?"
- **Type:** Multiple choice
- **Options:**
  - Basic Grooming
  - Full Grooming
  - Spa Treatments
  - Not sure - need consultation
- **Required:** Yes

#### Field 7: Message
- **Question:** "Tell us more about your inquiry or any special requirements"
- **Type:** Paragraph
- **Required:** No

#### Field 8: Preferred Contact Method
- **Question:** "How would you prefer us to contact you?"
- **Type:** Multiple choice
- **Options:**
  - WhatsApp
  - Phone Call
  - Email
- **Required:** Yes

### 3. Customize Form Appearance

1. Click on the **"Customize theme"** button (palette icon)
2. Choose a color scheme:
   - **Header color:** Forest Green (#228B22)
   - **Background color:** Warm Cream (#F5F5F4)
3. Upload The Pawlour logo as the header image (optional)

### 4. Get the Embed Code

1. Click on the **"Send"** button (top right)
2. Click on the **"<>"** (embed) icon
3. Copy the entire iframe code
4. The iframe will look something like this:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfYourFormIDHere/viewform?embedded=true" width="640" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
   ```

### 5. Update the Contact Page

1. Open `app/contact/page.tsx`
2. Find this line:
   ```jsx
   src="https://docs.google.com/forms/d/e/1FAIpQLSfYourFormIDHere/viewform?embedded=true"
   ```
3. Replace `1FAIpQLSfYourFormIDHere` with your actual Form ID from the embed code
4. The Form ID is the long string between `/e/` and `/viewform`

### 6. Configure Form Responses

1. In your Google Form, click on the **"Responses"** tab
2. Click on the **"Create spreadsheet"** icon
3. Choose to create a new spreadsheet or add to existing one
4. This will automatically collect all form submissions

### 7. Set Up Email Notifications (Optional)

1. In the **"Responses"** tab, click on the **"More"** menu (three dots)
2. Select **"Get email notifications for new responses"**
3. This will send you an email each time someone submits the form

## Form Customization Tips

### Customize Confirmation Message
1. Click on the **"Responses"** tab
2. Click on the **"Confirmation message"** icon
3. Add a custom message like:
   ```
   Thank you for contacting The Pawlour! 
   We'll get back to you within 1-2 hours via your preferred contact method.
   
   In the meantime, feel free to reach out to us on WhatsApp: +65 8668 9078
   ```

### Add Required Fields
- Click on each question
- Toggle the **"Required"** switch to make it mandatory

### Set Up Conditional Logic (Optional)
- Click on the **"More"** menu (three dots) on a question
- Select **"Go to section based on answer"** to create branching logic

## Testing the Form

1. Click the **"Preview"** button (eye icon) to test the form
2. Fill out all fields to ensure everything works
3. Submit a test response
4. Check your Google Sheet to confirm the response was recorded

## Troubleshooting

### Form Not Showing on Website
- Verify the Form ID is correct in the iframe src
- Check that the form is published (not in draft mode)
- Clear browser cache and refresh the page

### Form Submissions Not Recording
- Ensure you've set up the Google Sheet for responses
- Check that the form is not set to "Closed"
- Verify email notifications are enabled

### Styling Issues
- The form will inherit some styles from the page
- If needed, adjust the iframe height in `app/contact/page.tsx`
- Current height is set to 800px, adjust as needed

## Security & Privacy

- Google Forms automatically encrypts responses
- Responses are stored in your Google Drive
- You can share the spreadsheet with team members
- Consider adding a privacy notice to your form

## Mobile Responsiveness

The embedded form is responsive and will work on:
- Desktop browsers
- Tablets
- Mobile devices

The iframe will automatically adjust to fit the screen size.

## Alternative: Direct WhatsApp Link

If you prefer not to use a Google Form, users can still:
- Click the "Chat on WhatsApp" button
- Call directly using the phone number
- Both options are prominently displayed on the contact page

## Next Steps

1. Create your Google Form following the steps above
2. Get your Form ID from the embed code
3. Update the iframe src in `app/contact/page.tsx`
4. Test the form on both desktop and mobile
5. Set up email notifications for new submissions
6. Share the form link with your team if needed

---

**Note:** The contact page is fully functional without the Google Form. Users can still reach out via WhatsApp or phone. The form is an additional channel for inquiries.
